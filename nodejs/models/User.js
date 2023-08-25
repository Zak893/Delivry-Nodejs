const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  // Autres champs si nécessaire
});

const User = mongoose.model('User', userSchema);

module.exports = User;
