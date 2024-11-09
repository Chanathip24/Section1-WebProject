const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return res.status(401).json("Access Denied : No token");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Invalid or expired token.");
    req.user = decoded;
    next();
  });
};
