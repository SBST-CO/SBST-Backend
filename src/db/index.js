const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: '3306',
  database: 'sbst',
  password: 'java',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 100
});

module.exports = pool.promise()