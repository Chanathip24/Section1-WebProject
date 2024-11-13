const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "catcat"

exports.checkToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return res.status(401).json("Access Denied : No token");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Invalid or expired token.");
    req.user = decoded;
    next();
  });
};
