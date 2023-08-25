const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userType: { type: String},
  email: { type: String, required: true },
  adress: { type: String, required: true },
  Ville: { type: String, required: true },
  complement: { type: String },
  postal: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
