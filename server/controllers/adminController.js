const db = require("../config/db.js");
const bcrypt = require("bcrypt");

exports.adminRegister = (req, res) => {
  //check role first
  if (req.user.role !== "ADMIN") return res.status(403).json("You are not an admin.");
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
        return res.status(200).json("Register success");
      }
    );
  });
};

exports.getAlluser = (req, res) => {
  //check admin
  if (req.user.role !== "ADMIN") return res.status(403).json("INVALID TOKEN");
  const query =
    "SELECT id,email,fname,lname,role,address,phone,created_at,updated_at from users";

  db.query(query, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
};

exports.getUserById = (req, res) => {
  // Check if the user is an admin
  if (req.user.role !== "ADMIN") return res.status(403).json("INVALID TOKEN");

  const userId = req.params.id; // Get the user ID from URL parameters

  // SQL query to get the user by ID
  const query =
    "SELECT id, email, fname, lname, role, address, phone, created_at, updated_at FROM users WHERE id = ?";

  // Execute the query
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json(err);

    // Check if user exists
    if (result.length === 0) return res.status(404).json("User not found");

    // Send the user data
    res.json(result[0]); // Return the first (and only) result
  });
};

exports.adminManageUser = (req, res) => {
  // check admin
  if (req.user.role !== "ADMIN") return res.status(403).json("INVALID TOKEN");

  //userid
  const userId = req.params.id;
  //userdata
  const { email, fname, lname, password, address, phone, role } = req.body;

  const updates = [];
  const updateQueryParts = [];

  // check field first
  if (email && email.trim() !== "") {
    updates.push(email);
    updateQueryParts.push("email = ?");
  }
  if (fname && fname.trim() !== "") {
    updates.push(fname);
    updateQueryParts.push("fname = ?");
  }
  if (lname && lname.trim() !== "") {
    updates.push(lname);
    updateQueryParts.push("lname = ?");
  }
  if (address && address.trim() !== "") {
    updates.push(address);
    updateQueryParts.push("address = ?");
  }
  if (phone && phone.trim() !== "") {
    updates.push(phone);
    updateQueryParts.push("phone = ?");
  }
  if (role && role.trim() !== "") {
    updates.push(role);
    updateQueryParts.push("role = ?");
  }

 
  // If password is provided, hash it
  if (password && password.trim() !== "") {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json(err);

      updates.push(hashedPassword); // add password
      updateQueryParts.push("password = ?");

      const updateQuery = `UPDATE users SET ${updateQueryParts.join(", ")} WHERE id = ?`;
      db.query(updateQuery, [...updates, userId], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("User updated successfully");
      });
    });
  } else {
    // no password
    //no field update
    if (updateQueryParts.length === 0) {
      return res.status(400).json("No fields to update");
    }
    const updateQuery = `UPDATE users SET ${updateQueryParts.join(", ")} WHERE id = ?`;
    db.query(updateQuery, [...updates,userId], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User updated successfully");
    });
  }
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE from users where id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `User ${id} not found. ` });
    }
    res.status(200).json("Delete success");
  });
};
