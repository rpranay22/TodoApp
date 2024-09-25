
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pranay',
  database: 'userdetails'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define a route to fetch data from the database
app.post('/api/get', (req, res) => {
  const { uname, password } = req.body;

  const query = `SELECT * FROM users where uname like '${uname}' `; // replace 'mytable' with your table name
  db.query(query, [uname], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }

    res.json(results);

  });
});

app.post('/api/check', (req, res) => {
  const { uname } = req.body;

  const query = `SELECT * FROM users where uname like '${uname}' `; // replace 'mytable' with your table name
  db.query(query, [uname], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }

    res.json(results);

  });
});



// Define a route to handle POST requests
app.post('/api/data', async (req, res) => {
  const { name, uname, password, token } = req.body; // replace with your table columns
  const val = await bcryptjs.hash(password, 10);

  const query = 'INSERT INTO users (name, uname,password,jwt_token) VALUES (?, ?,?,?)';
  db.query(query, [name, uname, val, token], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error executing query');
      return;
    }
    res.status(201).send('Data inserted successfully');
  });

});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close the database connection when the process ends
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error ending the database connection:', err.message);
      return;
    }
    console.log('Database connection closed.');
  });
  process.exit();
});
