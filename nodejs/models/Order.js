const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  Del: { type: String },
  Delemail: { type: String },
  email: { type: String, required: true },
  adress: { type: String, required: true },
  Ville: { type: String, required: true },
  complement: { type: String },
  postal: { type: String, required: true },
  poids: { type: String, required: true },
  rate: { type: Number },
});

const Address = mongoose.model('Order', orderSchema);

module.exports = Address;
