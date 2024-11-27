const express = require('express');
const bodyParser = require('body-parser');
// const stripe = require('stripe')('VOTRE_CLE_SECRETE_STRIPE');
const stripe = require('stripe')('sk_test_51QOczzJRqShZcJZ5vQJcbP5A9G958DyDOCJHlfuLEHASu8eXdFEW7cwh9jd5ePdx15JfWvbhOzBOwlTordc8uBbE005dTGGMDr');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour créer une session de paiement
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Produit Exemple',
                        },
                        unit_amount: 2000, // Montant en cents (20.00 USD)
                    },
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:4242/success.html',
            cancel_url: 'http://localhost:4242/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Démarrer le serveur
app.listen(4242, () => console.log('Serveur démarré sur http://localhost:4242'));