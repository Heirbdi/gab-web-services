const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import des routes
const stripeRoutes = require("./routes/stripeRoutes");

// Initialisation de l'application Express
const app = express();

// Port d'écoute (modifiez selon l'environnement)
const PORT = process.env.PORT || 4242;

// Middleware
app.use(cors()); // Autorise les requêtes Cross-Origin
app.use(bodyParser.json()); // Analyse les requêtes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Support pour les requêtes URL-encoded

// Servir les fichiers statiques (HTML, CSS, JS) si nécessaire
app.use(express.static(path.join(__dirname, "public")));

// Route principale (pour les pages HTML)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Intégration des routes Stripe
app.use("/api/stripe", stripeRoutes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Quelque chose s'est mal passé !");
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
