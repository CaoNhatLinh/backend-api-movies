const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql-24660be8-watchmovies-android.e.aivencloud.com',
  port: 25218,
  user: 'avnadmin',
  password: 'AVNS_tPMN8uu1JgRS1Ymm6ny',
  database: 'defaultdb'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to database');
});

module.exports = db;
