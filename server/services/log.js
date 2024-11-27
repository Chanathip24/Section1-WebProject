const db = require("../config/db");

exports.loguserAttempt = (userId, userIp, userAgent, status) => {
  const query =
    "INSERT INTO login_logs(user_id, ip_address, user_agent, status) VALUES(?, ?, ?, ?)";

  // status 'SUCCESS', 'FAILED'
  db.query(query, [userId, userIp, userAgent, status], (err, result) => {
    if (err) {
      return;
    }
  });
};
