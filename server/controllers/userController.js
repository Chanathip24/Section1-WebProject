const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.checkLogin = (req, res) => {
  return res.json({ role: req.user.role, email: req.user.email });
};

exports.userLogout = (req, res) => {
  res.clearCookie("token");
  return res.json("Logout successfully");
};

exports.userLogin = (req, res) => {
  const query = "SELECT * FROM users where email = ?";
  const { email, password } = req.body;

  db.query(query, [email], (err, result) => {
    if (err) res.status(500).json(err);
    
    if (!result || result.length === 0)
      return res.status(500).json("This email is not registered");

    const user = result[0];
    const userPassword = user.password;

    bcrypt.compare(password, userPassword, (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result) return res.status(400).json("Wrong password");

      const token = jwt.sign({ email: user.email, role: user.role }, "catcat", {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        secure: false,
        httpOnly: true,
        maxAge: 1000*60*60,
      });
      res.status(200).json("success");
    });
  });
};

exports.userRegister = (req, res) => {
  // query update table users
  const query =
    "INSERT into users(email,fname,lname,password,address,phone,role) value(?,?,?,?,?,?,?)";

  //user data from form
  const { email, fname, lname, password, address, phone } = req.body;
  const role = req.body.role ? req.body.role : "CUSTOMER";

  bcrypt.hash(password, 10, (err, result) => {
    if (err) return res.json(err);
    db.query(
      query,
      [email, fname, lname, result, address, phone, role],
      (err) => {
        if (err) return res.status(500).json(err);

        //if pass sign jwt
        const token = jwt.sign({ email: email, role: role }, "catcat", {
          expiresIn: "1h",
        });
        //cookie store jwt token
        res.cookie("token", token, {
          secure: false,
          httpOnly: true,
          maxAge: 1000*60*60, //1 hour
        });

        res.status(200).json("Register success");
      }
    );
  });
};
