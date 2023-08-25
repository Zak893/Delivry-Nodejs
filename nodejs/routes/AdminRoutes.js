const express = require('express');
const router = express.Router();
const UserController = require('../controllers/adminController'); // Assurez-vous du chemin correct
const User = require('../models/Admin'); // Assurez-vous que le chemin est correct



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
            });
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ... Autres routes existantes ...

module.exports = router;
