const express = require('express');
const app = express();
const db = require('./db');

// Enable parsing JSON request bodies
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`[REQ] ${req.method} ${req.path}`);
    next();
});

app.use(express.static('public'));

// Directe test route
app.get('/test', (req, res) => {
    res.json({ bericht: "De server werkt en de route is gevonden!" });
});

// Mount the route module in ./routes/afdelingen.js
const afdelingenRouter = require('./routes/afdelingen');
app.use('/afdelingen', afdelingenRouter);

const leidingRouter = require('./routes/leiding');
app.use('/leiding', leidingRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op poort ${PORT}`);
});