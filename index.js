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

app.use(express.static('public'));

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

// Mount leiding router (CRUD voor leiding)
const leidingRouter = require('./routes/leiding');
app.use('/leiding', leidingRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});
// (Leiding routes are handled in ./routes/leiding.js)