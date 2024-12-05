const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");
const path = require("path");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour envoyer des SMS
app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;

    try {
        await client.messages.create({
            body: message,
            from: "+19787092508",
            to: phone,
        });
        res.status(200).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Twilio credentials
const accountSid = "AC079d6eb1707d208aaa710be38362eaa1";
const authToken = "7946ce897d00b754cc3ad5d5be9f4a50";
const client = twilio(accountSid, authToken);

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur Twilio en écoute sur http://localhost:${port}`);
});
