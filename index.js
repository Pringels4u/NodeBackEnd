const express = require('express');
const app = express();
const afdelingenRouter = require('./routes/afdelingen');

app.use(express.json());

// Koppel de routes aan een specifiek pad
app.use('/afdelingen', afdelingenRouter);

app.listen(3000, () => console.log('Server is gestart!'));