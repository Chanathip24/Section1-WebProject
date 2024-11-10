const mysql = require('mysql2')

const db = mysql.createPool(
    {
        host : "chanathip.com",
        user: "CHANATHIP",
        password : "@24Chanathipdb",
        database : "mydb",
        connectTimeout : 10000,
        waitForConnections: true,
        connectionLimit: 10,
        enableKeepAlive : true,
        queueLimit: 0
    }
)

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database as id ' + connection.threadId);
    connection.release();  
});


module.exports = db;