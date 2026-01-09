const express = require('express');
const router = express.Router();
const db = require('../db');

// Let op: alleen een '/' hier!
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM afdelingen');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;