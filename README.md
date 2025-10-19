1) Tietokanta (MariaDB)
Aja skripti:
```bash
mysql -u root -p < backend/sql/schema.sql

2) Backend
cd backend
npm install
npm run dev

3) Frontend
cd ../frontend
npm install
npm run dev

Sovellus toimii osoitteessa
http://localhost:5173

ja backend osoitteessa
http://localhost:4000/api
