const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'mydatabase',
    user: 'postgres',
    password: '20150'
});

db.connect()
    .then(() => console.log("✅ PostgreSQL Connected Successfully!"))
    .catch(err => console.error("❌ Connection Error:", err));

module.exports = db;
