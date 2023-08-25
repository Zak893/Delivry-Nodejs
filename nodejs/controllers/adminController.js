const User = require('../models/Admin');

const userController = {
  createUser: async (req, res) => {
    try {
      const {email, password } = req.body;
      const newUser = new User({
        email,
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
