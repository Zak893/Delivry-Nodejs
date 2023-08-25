const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importez le package cors
const app = express();
app.use(cors()); // Utilisez le middleware cors pour gérer les problèmes de CORS


require('dotenv').config();

// Importez vos routes d'utilisateurs (remplacez 'products_routes' par le nom correct)
const userRoutes = require('./routes/userRoutes'); // Assurez-vous que le chemin est correct
const delivryRoutes = require('./routes/delivryRoutes'); // Assurez-vous que le chemin est correct
const adressRoutes = require('./routes/AdressRoutes'); // Assurez-vous que le chemin est correct
const orderRoutes = require('./routes/OrderRoutes'); // Assurez-vous que le chemin est correct
const adminRoutes = require('./routes/AdminRoutes'); // Assurez-vous que le chemin est correct


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connecté à la base de données MongoDB');

  // Une fois connecté à la base de données, démarrez le serveur Express
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });
})
.catch((error) => {
  console.error('Erreur de connexion à la base de données MongoDB:', error);
});

app.use(express.json());

// Utilisez vos routes d'utilisateurs (remplacez '/api/user' par le chemin correct)
app.use('/user', userRoutes); 
app.use('/delivry', delivryRoutes); 
app.use('/', adressRoutes); 
app.use('/admin', adminRoutes); 
app.use('/', orderRoutes); 

// Gérez les autres routes et configurations si nécessaires
