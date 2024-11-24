const mysql = require('mysql2');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 20000,        // 20 seconds connection timeout
    waitForConnections: true,     // Queue connections if needed
    connectionLimit: 10,          // Maximum 10 connections
    enableKeepAlive: true,       // Keep connections alive
    keepAliveInitialDelay: 10000 // Initial keep-alive delay
};

const db = mysql.createPool(dbConfig);

// Basic error handling
db.on('error', (err) => {
    console.error('Database error:', err);
});

module.exports = db;