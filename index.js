const express = require('express');
const app = express();
const afdelingenRouter = require('./routes/afdelingen'); // Check of dit pad klopt

app.use(express.json());

// Hier vertel je Express: "Alles wat naar /afdelingen gaat, moet naar afdelingenRouter"
app.use('/afdelingen', afdelingenRouter); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});