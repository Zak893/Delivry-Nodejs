const mongoose = require('mongoose');

const delivrySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  deliveryService: String,
  poids: Number,
  active: Number,

  // Autres champs si nécessaire
});

const User = mongoose.model('Delivery', delivrySchema);

module.exports = User;
