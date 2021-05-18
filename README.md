# Altern'Bot - Web

**Projet web :** interface utilisateur permettant l'initialisation du bot.

**Documentation générale :** [alternbot-app](https://github.com/B4va/alternbot-app)

**Site web :** https://alternbot-web.herokuapp.com/

## Configuration

Créer un fichier `/.env` et renseigner les informations suivantes :

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `BOT_ID`

**Exemple de fichier de configuration :**

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=alternbot
DB_USER=user
DB_PASSWORD=pwd
BOT_ID=123456789
```

## Scripts

- `npm start` : Lancement du serveur
- `npm run dev` : Lancement du serveur en mode développement

Après exécution du script de lancement, le site web est accessible via l'url suivant : `localhost:3000`.
