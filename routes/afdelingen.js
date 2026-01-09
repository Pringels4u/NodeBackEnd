const express = require('express');
const router = express.Router();
// Hier komt later je database connectie

// GET alle afdelingen
router.get('/', (req, res) => {
    // Hier komt je SQL: SELECT * FROM afdelingen
    res.json({ message: "Lijst van alle Vroentjes afdelingen" });
});

module.exports = router;