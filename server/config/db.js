const mysql = require('mysql2')

const db = mysql.createPool(
    {
        host : "chanathip.com",
        user: "CHANATHIP",
        password : "@24Chanathipdb",
        database : "mydb",
        connectTimeout : 10000
    }
)


module.exports = db;