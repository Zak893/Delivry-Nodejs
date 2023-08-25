const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connecté à la base de données MongoDB');

  const collections = await mongoose.connection.db.collections();
  collections.forEach((collection) => {
    console.log('Nom de la collection :', collection.collectionName);
  });
})
.catch((error) => {
  console.error('Erreur de connexion à la base de données MongoDB:', error);
});
