const express = require('express');
const router = express.Router();
const db = require('../db');
const { validateAfdeling } = require('../middleware/validation');

// GET /afdelingen?limit=10&offset=0  (list with optional pagination)
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const [rows] = await db.query('SELECT * FROM afdelingen LIMIT ? OFFSET ?', [limit, offset]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /afdelingen/search?naam=Speel
router.get('/search', async (req, res) => {
    const { naam } = req.query;
    if (!naam) return res.status(400).json({ error: 'Query parameter "naam" is vereist' });

    try {
        const [rows] = await db.query('SELECT * FROM afdelingen WHERE naam LIKE ?', [`%${naam}%`]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /afdelingen/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM afdelingen WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Afdeling niet gevonden' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /afdelingen
router.post('/', validateAfdeling, async (req, res) => {
    const { naam, leerjaren } = req.body;
    try {
        const [result] = await db.query('INSERT INTO afdelingen (naam, leerjaren) VALUES (?, ?)', [naam, leerjaren]);
        res.status(201).json({ message: 'Afdeling toegevoegd', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /afdelingen/:id
router.put('/:id', validateAfdeling, async (req, res) => {
    const { id } = req.params;
    const { naam, leerjaren } = req.body;
    try {
        const [result] = await db.query('UPDATE afdelingen SET naam = ?, leerjaren = ? WHERE id = ?', [naam, leerjaren, id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Afdeling niet gevonden' });
        res.json({ message: 'Afdeling bijgewerkt' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /afdelingen/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM afdelingen WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Afdeling niet gevonden' });
        res.json({ message: 'Afdeling verwijderd' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;