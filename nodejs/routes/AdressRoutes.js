const express = require('express');
const router = express.Router();
const Address = require('../models/Adress');
const adressController = require('../controllers/adressController'); // Assurez-vous du chemin correct

router.post('/save-address', adressController.saveAddress);
router.get('/get-address', adressController.getAddress);

router.get('/get-delivry-address', async (req, res) => {
    try {
        const userType = 'Del'; // Valeur de userType pour les livreurs
        const drivers = await Address.find({ userType });// Utilisez le modèle approprié pour les livreurs
  
      res.json({ success: true, drivers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
