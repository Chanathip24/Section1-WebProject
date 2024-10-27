const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return res.status(401).json("Access Denied : No token");

  jwt.verify(token, "catcat", (err, decoded) => {
    if (err) return res.status(403).json("Invalid or expired token.");
    req.user = decoded;
    next();
  });
};
