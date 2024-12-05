const express = require("express");
const twilio = require("twilio");

const router = express.Router();

// Twilio configuration
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Route pour envoyer des SMS
router.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: "Le numéro de téléphone et le message sont requis." });
    }

    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
        });
        res.status(200).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'envoi du message." });
    }
});

module.exports = router;

