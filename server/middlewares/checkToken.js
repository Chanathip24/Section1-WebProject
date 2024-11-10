const jwt = require("jsonwebtoken");

const JWT = process.env.JWT_SECRET || "catcat"
exports.checkToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return res.status(401).json("Access Denied : No token");

  jwt.verify(token, JWT, (err, decoded) => {
    if (err) return res.status(403).json("Invalid or expired token.");
    req.user = decoded;
    next();
  });
};
