require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
});

connection.connect();

module.exports = connection;