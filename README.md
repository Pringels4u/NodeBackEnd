# NodeBackEnd

Dit project is een eenvoudige Node.js + Express API die twee entiteiten beheert: `afdelingen` en `leiding`.

Belangrijkste features
- CRUD voor `afdelingen` (lijst, details, aanmaken, updaten, verwijderen)
- CRUD voor `leiding` (lijst, details, aanmaken, updaten, verwijderen)
- Pagination (limit & offset) en zoek endpoints
- Basis-validatie voor invoer
- Root HTML pagina die alle endpoints beschrijft

Setup (Windows)
1. Installeer Node.js 20+ (https://nodejs.org/)
2. Clone de repo:

	 git clone <url>
	 cd NodeBackEnd

3. Installeer dependencies:

	 npm install

4. Maak een `.env` bestand in projectroot met je databasegegevens:

	 DB_HOST=localhost
	 DB_USER=root
	 DB_PASSWORD=...
	 DB_NAME=your_database_name

5. Start de server:

	 node index.js

	 of tijdens ontwikkeling:

	 npx nodemon index.js

6. Open de root in je browser: http://localhost:3000 — daar staat een overzicht van de API endpoints.

DB tools
- DBngin / Herd: gebruik deze om lokale database-instanties te draaien (maak een MySQL instance en gebruik dezelfde credentials in `.env`).
- TablePlus: handige GUI om je database te inspecteren en queries uit te voeren.

Testing met Postman
- Import endpoints handmatig of maak requests zoals:
	- GET http://localhost:3000/afdelingen
	- POST http://localhost:3000/afdelingen  (JSON body: { "naam": "Speelclub", "leerjaren": 1 })

Bronvermelding
- Codepatronen en query-opzet zijn samengesteld met behulp van officiële docs en tutorials. Belangrijke bronnen die ik gebruikte:
	- Express docs: https://expressjs.com/
	- mysql2 package: https://github.com/sidorares/node-mysql2

Opmerkingen
- Voeg `node_modules/` en `.env` toe aan je `.gitignore` (is al aanwezig).
- Zorg dat je database tabellen `afdelingen` en `leiding` bestaan. Een minimale SQL-schets:

	CREATE TABLE afdelingen (
		id INT AUTO_INCREMENT PRIMARY KEY,
		naam VARCHAR(255) NOT NULL,
		leerjaren INT NOT NULL
	);

	CREATE TABLE leiding (
		id INT AUTO_INCREMENT PRIMARY KEY,
		voornaam VARCHAR(255) NOT NULL,
		achternaam VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		afdeling_id INT,
		FOREIGN KEY (afdeling_id) REFERENCES afdelingen(id)
	);

Volgende stappen / aanbevolen extra's
- Voeg unit tests of een Postman-collection toe.
- Verbeter validatie, voeg authenticatie (JWT) toe voor beschermde routes.

Praktische aanvullingen (toegevoegd)
----------------------------------

1) .env voorbeeld

Maak een bestand `.env` in de projectroot (niet committen). Bijvoorbeeld:

```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=chiro_vroentjes
PORT=3000
```

Als je liever de schema in `sql/schema.sql` gebruikt, pas `DB_NAME` aan naar `nodebackend` of importeer het SQL-bestand in je database.

2) Starten (Windows / PowerShell)

Installeren dependencies:

```powershell
npm install
```

Start server (ontwikkeling met nodemon):

```powershell
npm run dev
```

Of productie:

```powershell
npm start
```

3) Gezonde start-checks en troubleshooting

- Als `node index.js` direct crasht met een DB-fout: controleer dat MySQL draait en dat de waarden in je `.env` correct zijn (host, user, password, database).
- Veelgemaakte oorzaak: `DB_PASSWORD` leeg of onjuist, of database bestaat niet. Gebruik TablePlus of MySQL CLI om te verifiëren dat je kunt inloggen met dezelfde credentials.
- Als je een andere database-naam gebruikt (bijv. `nodebackend`), zorg dat `DB_NAME` overeenkomt of importeer `sql/schema.sql`.

4) Testen van API (snelle checks)

- Open in browser of Postman:
	- http://localhost:3000/ -> overzichtspagina
	- http://localhost:3000/test -> eenvoudige JSON responsetest

- Voorbeeld curl (GET lijst afdelingen):

```powershell
curl http://localhost:3000/afdelingen
```

- POST voorbeeld (maak afdeling):

```powershell
curl -H "Content-Type: application/json" -d '{"naam":"SpeelclubNieuw","leerjaren":1}' http://localhost:3000/afdelingen
```

5) Postman

- Er is een `postman_collection.json` in de repo met voorbeeldrequests die je kunt importeren in Postman.

6) Verbeteringen en aanbevelingen

- Voeg een `.env.example` toe (zonder geheimen) en vermeld deze in `.gitignore` instructies.
- Voeg eenvoudige uptime/health endpoint of verbeterde foutmelding als DB niet bereikbaar is.
- Voeg een test-suite toe (mocha/jest + supertest) om endpoints automatisch te valideren voor de beoordeling.

Contact / hulp
----------------
Als je wilt kan ik:

- a) een `.env.example` toevoegen en `index.js` laten controleren op vereiste env-variabelen (met duidelijke foutmelding), of
- b) een kleine test-suite toevoegen (Supertest + Mocha) met 3-4 basis-tests.

Laat me weten welke je wilt — dan implementeer ik het.
