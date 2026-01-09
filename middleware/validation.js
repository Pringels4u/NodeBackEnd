// Simple validation middleware for afdelingen and leiding
const validateAfdeling = (req, res, next) => {
    const { naam, leerjaren } = req.body;
    if (!naam || typeof naam !== 'string' || naam.trim() === '') {
        return res.status(400).json({ error: 'Naam is vereist en mag niet leeg zijn' });
    }
    if (leerjaren === undefined || isNaN(Number(leerjaren))) {
        return res.status(400).json({ error: 'Leerjaren is vereist en moet numeriek zijn' });
    }
    next();
};

const validateLeiding = (req, res, next) => {
    const { voornaam, achternaam, email, afdeling_id } = req.body;
    if (!voornaam || typeof voornaam !== 'string' || /\d/.test(voornaam)) {
        return res.status(400).json({ error: 'Voornaam is vereist en mag geen cijfers bevatten' });
    }
    if (!achternaam || typeof achternaam !== 'string' || achternaam.trim() === '') {
        return res.status(400).json({ error: 'Achternaam is vereist' });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Een geldig e-mailadres is vereist' });
    }
    if (afdeling_id === undefined || isNaN(Number(afdeling_id))) {
        return res.status(400).json({ error: 'afdeling_id is vereist en moet numeriek zijn' });
    }
    next();
};

module.exports = { validateAfdeling, validateLeiding };
