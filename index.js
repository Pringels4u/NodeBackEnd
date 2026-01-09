const express = require('express');
const app = express();
const db = require('./db');

// DEZE REGEL IS CRUCIAAL: Dit zorgt dat de server JSON begrijpt
app.use(express.json()); 

// De rest van je codes (app.get, app.post, etc...)

// Log incoming requests to help debug which route handles them
app.use((req, res, next) => {
    console.log(`[REQ] ${req.method} ${req.path}`);
    next();
});

// Directe test route
app.get('/test', (req, res) => {
    res.json({ bericht: "De server werkt en de route is gevonden!" });
});

// Je oude route, maar dan direct hier geschreven
// Mount the route module in ./routes/afdelingen.js
const afdelingenRouter = require('./routes/afdelingen');
app.use('/afdelingen', afdelingenRouter);

// If you want a quick local test without DB, you can temporarily uncomment
// the block below. Prefer using the router that queries the DB.
// app.get('/afdelingen', (req, res) => {
//     res.json([
//         { id: 1, naam: "Speelclub" },
//         { id: 2, naam: "Rakkers" }
//     ]);
// });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});

const db = require('./db'); // Zorg dat dit bovenaan staat

// Route om nieuwe leiding toe te voegen
app.post('/leiding', async (req, res) => {
    const { voornaam, achternaam, email, afdeling_id } = req.body;
    
    try {
        const query = 'INSERT INTO leiding (voornaam, achternaam, email, afdeling_id) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [voornaam, achternaam, email, afdeling_id]);
        
        res.status(201).json({ 
            message: "Leider/Leidster succesvol toegevoegd!", 
            id: result.insertId 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Route om alle leiding op te halen (inclusief hun afdeling)
app.get('/leiding', async (req, res) => {
    try {
        // We gebruiken een JOIN om ook de naam van de afdeling te zien
        const query = `
            SELECT leiding.*, afdelingen.naam AS afdeling_naam 
            FROM leiding 
            LEFT JOIN afdelingen ON leiding.afdeling_id = afdelingen.id
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});