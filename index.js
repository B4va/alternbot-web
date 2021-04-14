const express = require('express');
const path = require('path');

/**
 * Configuration générale.
 */
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

/**
 * Lancement du serveur.
 */
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}.`));

/**
 * Routing.
 */

// Test
app.get('/', async (req, res) => {
    res.render("home", {title: 'Home'});
});
