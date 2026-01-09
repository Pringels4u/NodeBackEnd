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
