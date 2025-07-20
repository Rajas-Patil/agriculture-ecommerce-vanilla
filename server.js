const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');  // To handle cross-origin requests

app.use(cors());  // Allow cross-origin requests from frontend
app.use(bodyParser.json());

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'agri_ecommerce'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Signup route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Server error');
        res.send({ message: 'User registered successfully!', userId: result.insertId });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(404).send('User not found');

        const user = results[0];

        // Check password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Invalid credentials');

        res.send({ message: 'Login successful!', userId: user.id });
    });
});

// Fetch user data by ID
app.get('/user/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT username, email, created_at FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(404).send('User not found');

        res.send(results[0]);  // Send user data back to the client
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
