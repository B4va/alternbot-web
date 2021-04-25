const express = require('express');
const path = require('path');
const {Client} = require('pg');

/**
 * Configuration générale.
 */
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

/**
 * Initialisation de la connexion bdd.
 */
const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT} = process.env;
const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
console.log('DB :', connectionString);
const client = new Client({
    connectionString: connectionString
});
client.connect();

/**
 * Lancement du serveur.
 */
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}.`));

/**
 * Routing.
 */

// Test
app.get('/', async (req, res) => {
    const r = await client.query("SELECT * FROM servers")
    console.log(r.rows);
    res.render('home', {title: "Altern'Bot"});
});
