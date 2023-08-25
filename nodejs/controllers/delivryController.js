const Delivry = require('../models/Delivry');

const delivryController = {
    createDelivery: async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, password, deliveryService, poids ,active=0,} = req.body;
      const newUser = new Delivry({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        deliveryService,
        poids,
        active,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Autres fonctions de contrôleur ici...
};

module.exports = delivryController;
