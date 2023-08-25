const address = require('../models/Order');

const orderController = {
    saveOrder: async (req, res) => {
    try {
      const {Del=null, Delemail=null, email, adress , Ville, complement, postal, poids, rate=0} = req.body;
     
        // Créez une nouvelle adresse
        const newOrder = new address({
            Del,
            Delemail,
            email,
            adress,
            Ville,
            complement,
            postal,
            poids,
            rate,
          });
          await newOrder.save();
          res.status(201).json(newOrder);
    

      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

 // Dans votre controller (adressController.js)

  getOrder: async (req, res) => {
  try {
    const { email } = req.query; // Récupérer l'e-mail de la requête

    // Utiliser l'e-mail pour rechercher les commandes du client dans la base de données
    const orders = await address.find({ email: email });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
},
getAllOrder: async (req, res) => {
    try {
        // Utiliser l'e-mail pour rechercher les commandes du client dans la base de données
      const orders = await address.find();
  
      res.json({ success: true, orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  async updateOrderEmail(req, res) {
    try {
        const orderId = req.params.orderId;
        const newEmail = req.body.email;
        const del = req.body.Del;

     await address.updateOne({ _id: orderId }, { Delemail: newEmail, Del: del });

      // Respond with a success message
      res.status(200).json({ message: 'Email updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  async updateOrderRate(req, res) {
    try {
      const orderId = req.params.orderId;
      const newRate = req.body.rate;

     await address.updateOne({ _id: orderId }, { rate: newRate });

      res.status(200).json({ message: 'Rate updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Autres fonctions de contrôleur ici...
};

module.exports = orderController;
