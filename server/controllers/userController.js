const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

//log
const { loguserAttempt } = require("../services/log.js");
//jwt
const JWT_SECRET = process.env.JWT_SECRET || "catcat";

//generate login token
const generateToken = (res, id, email, role) => {
  const token = jwt.sign({ id: id, email: email, role: role }, JWT_SECRET, {
    expiresIn: "30d",
    algorithm: "HS256",
  });
  res.cookie("token", token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 วัน
  });
};

exports.checkLogin = (req, res) => {
  return res.json({
    id: req.user.id,
    role: req.user.role,
    email: req.user.email,
  });
};

exports.userLogout = (req, res) => {
  res.clearCookie("token");
  return res.json("Logout successfully");
};

exports.userLogin = async (req, res) => {
  const query = "SELECT * FROM users where email = ?";
  const { email, password, recaptchaToken } = req.body;

  //request ip
  const ip = req.ip;
  const userAgent = req.get("User-Agent"); //device ของ user

  //recaptcha token
  const secret = "6Lefv4gqAAAAAJ9E4gyyHpmFY7Fb0GJTEHL5j31I";
  

  try {
    //recaptcha
    const recaptchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`
    );
    //recaptcha token ผิด
    if (!recaptchaRes.data.success) {
      return res.status(400).json({
        error: "reCAPTCHA verification failed",
      });
    }
    //end of recaptcha
    db.query(query, [email], (err, result) => {
      if (err) res.status(500).json(err);

      if (!result || result.length === 0)
        return res.status(401).json({ msg: "This email is not registered" });

      const user = result[0];
      const userPassword = user.password;

      bcrypt.compare(password, userPassword, (err, result) => {
        if (err) {
          loguserAttempt(user.id, ip, userAgent, "FAILED");
          return res.status(500).json(err);
        }
        if (!result) {
          loguserAttempt(user.id, ip, userAgent, "FAILED");
          return res.status(401).json({ msg: "Password is invalid" });
        }

        //if pass
        //generate login token
        generateToken(res, user.id, user.email, user.role);

        //update log
        loguserAttempt(user.id, ip, userAgent, "SUCCESS");
        return res.status(200).json("success");
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

exports.userRegister = async (req, res) => {
  // query update table users
  const query =
    "INSERT into users(email,fname,lname,password,address,phone,role) value(?,?,?,?,?,?,?)";

  //recaptCha secret key kub
  const secretKey = "6Lefv4gqAAAAAJ9E4gyyHpmFY7Fb0GJTEHL5j31I";

  //user data from form
  const { email, fname, lname, password, address, phone, recaptchaToken } =
    req.body;

  try {
    const recaptchaRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`
    );

    if (!recaptchaRes.data.success) {
      return res.status(400).json({
        error: "reCAPTCHA verification failed",
      });
    }

    const role = req.body.role ? req.body.role : "CUSTOMER";
    bcrypt.hash(password, 10, (err, hashpassword) => {
      if (err) {
        return res.json(err);
      }
      db.query(
        query,
        [email, fname, lname, hashpassword, address, phone, role],
        (err, result) => {
          if (err) {
            //email ซ้ำ
            if(err.code === "ER_DUP_ENTRY") return res.status(409).json({msg : "Email is already registered."})
            
            return res.status(500).json(err);
          }

          //generate token
          generateToken(res, result.insertId, email, role);
          loguserAttempt(result.insertId,req.ip,req.get('User-Agent'),"SUCCESS")
          return res.status(200).json({msg : "Register successfully"});
        }
      );
    });
  } catch (error) {
    
    res.status(500).json({
      error: "Server error",
    });
  }
};
