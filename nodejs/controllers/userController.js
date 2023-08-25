const User = require('../models/User');

const userController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Autres fonctions de contrôleur ici...
};

module.exports = userController;
