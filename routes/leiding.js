const express = require('express');
const router = express.Router();
const db = require('../db');
const { validateLeiding } = require('../middleware/validation');

// GET /leiding?limit=10&offset=0
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const query = `
            SELECT leiding.*, afdelingen.naam AS afdeling_naam
            FROM leiding
            LEFT JOIN afdelingen ON leiding.afdeling_id = afdelingen.id
            LIMIT ? OFFSET ?
        `;
        const [rows] = await db.query(query, [limit, offset]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /leiding/search?voornaam=Jan
router.get('/search', async (req, res) => {
    const { voornaam, achternaam, email } = req.query;
    const conditions = [];
    const params = [];

    if (voornaam) { conditions.push('voornaam LIKE ?'); params.push(`%${voornaam}%`); }
    if (achternaam) { conditions.push('achternaam LIKE ?'); params.push(`%${achternaam}%`); }
    if (email) { conditions.push('email LIKE ?'); params.push(`%${email}%`); }

    if (conditions.length === 0) return res.status(400).json({ error: 'Voer minstens één zoekparameter in (voornaam, achternaam, email)' });

    try {
        const query = `SELECT * FROM leiding WHERE ${conditions.join(' AND ')}`;
        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /leiding/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM leiding WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Leiding niet gevonden' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /leiding
router.post('/', validateLeiding, async (req, res) => {
    const { voornaam, achternaam, email, afdeling_id } = req.body;
    try {
        const [result] = await db.query('INSERT INTO leiding (voornaam, achternaam, email, afdeling_id) VALUES (?, ?, ?, ?)', [voornaam, achternaam, email, afdeling_id]);
        res.status(201).json({ message: 'Leiding toegevoegd', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /leiding/:id
router.put('/:id', validateLeiding, async (req, res) => {
    const { id } = req.params;
    const { voornaam, achternaam, email, afdeling_id } = req.body;
    try {
        const [result] = await db.query('UPDATE leiding SET voornaam = ?, achternaam = ?, email = ?, afdeling_id = ? WHERE id = ?', [voornaam, achternaam, email, afdeling_id, id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Leiding niet gevonden' });
        res.json({ message: 'Leiding bijgewerkt' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /leiding/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM leiding WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Leiding niet gevonden' });
        res.json({ message: 'Leiding verwijderd' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
