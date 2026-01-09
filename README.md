# NodeBackEnd

Dit project is een eenvoudige Node.js + Express API die twee entiteiten beheert: `afdelingen` en `leiding`.

Belangrijkste features
- CRUD voor `afdelingen` (lijst, details, aanmaken, updaten, verwijderen)
- CRUD voor `leiding` (lijst, details, aanmaken, updaten, verwijderen)
- Pagination (limit & offset) en zoek endpoints
- Basis-validatie voor invoer
- Root HTML pagina die alle endpoints beschrijft (in `public/index.html`)

Voor wie snel wil starten
-----------------------

1) Vereisten
- Node.js 20+ (of laatste LTS)
- Een MySQL-server (lokaal of remote)

2) Clone en dependencies

```powershell
git clone <url>
cd NodeBackEnd
npm install
```

3) `.env` bestand

Maak een bestand `.env` in de projectroot (commit dit bestand niet). Een voorbeeld:

```properties
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=chiro_vroentjes
PORT=3000
```

Als je liever het SQL-schema uit deze repo gebruikt, importeer `sql/schema.sql` en zet `DB_NAME` op `nodebackend` of pas het schema aan.

4) Server starten

Ontwikkeling (met nodemon):

```powershell
npm run dev
```

Productie:

```powershell
npm start
```

5) Snelle controle (testen)

- Open in browser of Postman:
  - http://localhost:3000/ -> overzichtspagina
  - http://localhost:3000/test -> eenvoudige JSON responsetest

- Voorbeeld (PowerShell curl):

```powershell
curl http://localhost:3000/afdelingen

curl -H "Content-Type: application/json" -d '{"naam":"SpeelclubNieuw","leerjaren":1}' http://localhost:3000/afdelingen
```

Postman
- Er is een `postman_collection.json` in de repo met voorbeeldrequests die je kunt importeren in Postman.

Troubleshooting
---------------

- Als `node index.js` crasht met een DB-fout: controleer dat MySQL draait en dat de waarden in je `.env` correct zijn (host, user, password, database).
- Veelvoorkomende oorzaken:
  - `DB_PASSWORD` is leeg of onjuist
  - De database (`DB_NAME`) bestaat niet
  - MySQL luistert op een andere host/poort

Gebruik TablePlus of MySQL CLI om te verifiëren dat je met dezelfde credentials kunt inloggen.

Bronnen
-------

- Express Best Practices Guide: https://expressjs.com/en/advanced/best-practice-performance.html
- Express docs: https://expressjs.com/
- mysql2 package: https://github.com/sidorares/node-mysql2
- REST API Design Guidelines: https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design

- Heb copilot Alleen gebruikt op het einde om te zien of ik alle features geimplementeerd had