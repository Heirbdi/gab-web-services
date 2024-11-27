const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Configurer Twilio
const accountSid = 'AC079d6eb1707d208aaa710be38362eaa1';
const authToken = '05fb61825ef0eb45414a339d93b6ed58';
const client = twilio(accountSid, authToken);

// Initialiser Express
const app = express();
app.use(bodyParser.json());

// Error sorve test
const cors = require('cors');
app.use(cors());


// Route pour envoyer le SMS
app.post('/send-sms', (req, res) => {
    const { to, message } = req.body; // Obtenir les données du client

    client.messages.create({
        body: message, // Message à envoyer
        from: '+19787092508', // Remplacez avec votre numéro Twilio
        to: '+25776946604', // Numéro de téléphone cible
    })
    .then((message) => {
        console.log(`Message envoyé : ${message.sid}`);
        res.status(200).send('Message envoyé avec succès !');
    })
    .catch((err) => {
        console.error('Erreur :', err);
        res.status(500).send('Erreur lors de l\'envoi du message');
    });
});


// Lancer le serveur
const PORT = 4242;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});