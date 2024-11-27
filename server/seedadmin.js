const bcrypt = require("bcrypt");
require('dotenv').config()
const db = require("./config/db");

const seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("adminadmin", 10);
    const query = `
        INSERT INTO users (email,fname,lname,password,role,address,phone)
        VALUES (?, ?, ?, ?,?,?,?)
      `;

    const values = [
      "admin@admin.admin",
      "admin",
      "admin",
      hashedPassword,
      "ADMIN",
      "admin@admin.com",
      "1234567890",
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting admin:", err);
      } else {
        console.log("Admin user created successfully!");
      }
      db.end();
    });
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

seedAdmin();
