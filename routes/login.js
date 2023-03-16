
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const userLogin = require('../db/queries/login');


module.exports = router;

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  userLogin.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          req.session.user = results[0];
          res.redirect('/dashboard');
        } else {
          res.render('login', { error: 'Invalid username or password' });
        }
      });
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
