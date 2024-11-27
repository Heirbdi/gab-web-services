// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBvuFuGWd4DuCyYfMrJS66QklmtQCqXJOQ",
    authDomain: "guichets-424c1.firebaseapp.com",
    databaseURL: "https://guichets-424c1-default-rtdb.firebaseio.com",
    projectId: "guichets-424c1",
    storageBucket: "guichets-424c1.firebasestorage.app",
    messagingSenderId: "831768264523",
    appId: "1:831768264523:web:cd110944491cf9c16eb2ce",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fonction pour ajouter des données
function writeUserData(userId, name, email, contact, message) {
    set(ref(database, 'users/' + userId), {
        name: name,
        email: email,
        contact: contact,
        message: message
    })
    .then(() => {
        alert("Données ajoutées avec succès !");

        // Efface le formulaire après l'envoi
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        console.error("Erreur lors de l'ajout des données : ", error);
    });
}

// Écouter le formulaire
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const tel = document.getElementById("tel").value;
    const message = document.getElementById("message").value;

    if (name && email && tel && message) {
        // Générer un ID utilisateur aléatoire
        const userId = Date.now(); // Utilise un timestamp comme ID unique

        // Appeler la fonction pour écrire dans Firebase
        writeUserData(userId, name, email, tel, message);
    } else {
        alert("Veuillez remplir tous les champs !");
    }
});

// 79909070