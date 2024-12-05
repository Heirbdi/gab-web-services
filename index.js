const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Charger les variables d'environnement

const stripeRoutes = require("./routes/stripeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.use("/api/stripe", stripeRoutes);

// Twilio Configuration
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Endpoint Twilio pour envoyer des SMS
app.post("/api/send-sms", async (req, res) => {
    const { phone, message } = req.body;

    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        });
        res.status(200).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
