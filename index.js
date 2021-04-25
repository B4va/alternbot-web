const express = require('express');
const path = require('path');
const {Client} = require('pg');
const bodyParser = require('body-parser');
const axios = require('axios');

/**
 * Configuration générale.
 */
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

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

app.get('/', async (req, res) => {
    res.render('home', {title: "Altern'Bot", error: false});
});

app.post('/', async (req, res) => {
    const {promotionName, scheduleUrl, serverId} = req.body;
    try {
        const reqTestUrl = await axios.get(scheduleUrl);
        console.log(promotionName, serverId);
        if (reqTestUrl.data.startsWith('BEGIN:VCALENDAR') && promotionName !== '' && serverId !== '' && scheduleUrl !== '') {
            await client.query("INSERT INTO schedules (promotion, url) VALUES ($1, $2)", [promotionName, scheduleUrl]);
            const scheduleId = await client.query("SELECT id FROM schedules WHERE url = $1", [scheduleUrl]);
            await client.query("INSERT INTO servers (reference, schedule_id) VALUES ($1, $2)", [serverId, scheduleId.rows[0].id])
            res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.BOT_ID}&scope=bot&permissions=268946512`)
        } else {
            res.redirect('/err');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/err');
    }
});

app.get('/err', (req, res) => {
    res.render('home', {title: "Altern'Bot", error: true});
})
