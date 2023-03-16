const express = require('express');
const router  = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

router.get('/', async (req, res) => {
  try {
    const organizationsResult = await pool.query('SELECT * FROM organizations');
    const organizations = organizationsResult.rows[0].name;
    const categoriesResult = await pool.query('SELECT * FROM categories');
    const categories = categoriesResult.rows;
    const accountsResult = await pool.query('SELECT * FROM accounts');
    const accounts = accountsResult.rows;
    res.render('allAccounts', { organizations: organizations, categories: categories, accounts: accounts });
  } catch (err) {
    console.log(err.message);
    res.send('server error');
  }
});


module.exports = router;
