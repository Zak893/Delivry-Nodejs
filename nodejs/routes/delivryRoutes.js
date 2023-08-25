const express = require('express');
const router = express.Router();
const DelivryController = require('../controllers/delivryController'); // Assurez-vous du chemin correct
const User = require('../models/Delivry'); // Assurez-vous que le chemin est correct

// Route pour créer un nouvel utilisateur
router.post('/create', DelivryController.createDelivery);

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par e-mail
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.json({ success: false });
      }
  
      const passwordMatch = password === user.password;
  
      if (passwordMatch && user.active == 1) {
        return res.json({
            success: true,
            user: {
                active:  user.active,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                deliveryService: user.deliveryService,
                poids: user.poids
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
      const {password, email, firstName, lastName, phoneNumber, deliveryService, poids} = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
            password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          deliveryService: deliveryService,
          poids: poids
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
  router.get('/get-delivery-drivers', async (req, res) => {
    try {
      const drivers = await User.find(); // Utilisez le modèle approprié pour les livreurs
  
      res.json({ success: true, drivers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  router.put('/update-driver-status', async (req, res) => {
    const { driverId, active } = req.body;
  
    try {
      const updatedDriver = await User.findByIdAndUpdate(
        driverId,
        { active }, // Mettez à jour le champ active
      );
  
      if (!updatedDriver) {
        return res.status(404).json({ success: false, message: 'Driver not found' });
      }
  
      res.json({ success: true, driver: updatedDriver });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error updating driver status' });
    }
  })

  
 );

// ... Autres routes existantes ...

module.exports = router;
