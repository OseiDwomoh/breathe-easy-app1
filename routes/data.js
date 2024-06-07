const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

//Administration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Error Info
router.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM observations');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
