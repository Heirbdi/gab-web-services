require('dotenv').config();


const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Utilisez une variable d'environnement
const authToken = process.env.TWILIO_AUTH_TOKEN;  // Utilisez une variable d'environnement

const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, message } = req.body;

        try {
            const response = await client.messages.create({
                body: message,
                from: '+19787092508', // Remplacez avec votre numéro Twilio
                to: '+25776946604',
            });

            console.log(`Message envoyé : ${response.sid}`);
            res.status(200).json({ message: 'Message envoyé avec succès !' });
        } catch (error) {
            console.error('Erreur :', error);
            res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée.' });
    }
}
