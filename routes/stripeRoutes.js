const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Route pour créer une session de paiement Stripe
router.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Produit Exemple",
                        },
                        unit_amount: 2000, // Montant en cents (20.00 USD)
                    },
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.origin}/success.html`,
            cancel_url: `${req.headers.origin}/cancel.html`,
        });
        console.log("Stripe Session:", session); // Log the session object
        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe Error:", error.message); // Log the error message
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
