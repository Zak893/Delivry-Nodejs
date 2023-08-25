const express = require('express');
const router = express.Router();
const Address = require('../models/Order');
const adressController = require('../controllers/orderController'); // Assurez-vous du chemin correct

router.post('/add-ordre', adressController.saveOrder);
router.get('/get-orders', adressController.getOrder);
router.get('/get-del-orders/:email', async (req, res) => {
    try {
      const Delemail = req.params.email;
  
      // Use the email to find orders in the database
      const orders = await Address.find({ Delemail: Delemail });
  
      res.json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });  
router.get('/get-all-orders', adressController.getAllOrder);
router.put('/update-order-email/:orderId', adressController.updateOrderEmail);
router.put('/update-order-rate/:orderId', adressController.updateOrderRate);
module.exports = router;
