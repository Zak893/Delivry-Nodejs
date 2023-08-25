const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); // Assurez-vous du chemin correct
const User = require('../models/User'); // Assurez-vous que le chemin est correct

router.get('/get-users', async (req, res) => {
    try {
      const drivers = await User.find(); // Utilisez le modèle approprié pour les livreurs
  
      res.json({ success: true, drivers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
// Route pour créer un nouvel utilisateur
router.post('/create', UserController.createUser);

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par e-mail
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.json({ success: false });
      }
  
      // Vérification du mot de passe (attention : ceci n'est pas sécurisé !)
      const passwordMatch = password === user.password;
  
        if (passwordMatch) {
            return res.json({
                success: true,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber
                    // Ajoutez d'autres propriétés si nécessaire
                }
            });
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/update', async (req, res) => {
    try {
      const {password, email, firstName, lastName, phoneNumber } = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
          password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        },
        { new: true } // Return the updated document
      );
  
      if (updatedUser) {
        return res.json({ success: true, updatedUser });
      } else {
        return res.json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
// ... Autres routes existantes ...

module.exports = router;
