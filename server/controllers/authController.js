const db = require('../config/db');

// SIGNUP CONTROLLER
exports.signup = (req, res) => {
  const { username, email, password, role } = req.body;

  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [username, email, password, role], (err, result) => {
    if (err) {
      console.error('Signup Error:', err.sqlMessage || err.message);
      res.status(500).json({ message: 'Signup failed' });
    } else {
      res.status(200).json({ message: 'Signup successful' });
    }
  });
};

// LOGIN CONTROLLER
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Login Error:', err.sqlMessage || err.message);
      res.status(500).json({ message: 'Login error' });
    } else if (results.length > 0) {
      const user = results[0];
      res.status(200).json({
        message: 'Login successful',
        role: user.role,
        username: user.username,
        email: user.email
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};
