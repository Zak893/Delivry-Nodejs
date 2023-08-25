const address = require('../models/Adress');

const adressController = {
    saveAddress: async (req, res) => {
    try {
      const {userType, email, adress , Ville, complement, postal} = req.body;
      let existingAddress = await address.findOne({ email });
      if (existingAddress) {
        // Mettez à jour l'adresse existante
        existingAddress.adress = adress;
        existingAddress.Ville = Ville;
        existingAddress.complement = complement;
        existingAddress.postal = postal;
        await existingAddress.save();
        res.json({ success: true });
      } else {
        // Créez une nouvelle adresse
        const newAdress = new address({
            userType,
            email,
            adress,
            Ville,
            complement,
            postal,
          });
          await newAdress.save();
          res.status(201).json(newAdress);
      }

      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

   getAddress: async (req, res) => {
    try {
      const { email } = req.query; // Récupérez l'e-mail de l'utilisateur depuis les paramètres de requête
  
      // Recherchez l'adresse de l'utilisateur en fonction de l'e-mail
      const Address = await address.findOne({ email });
  
      if (Address) {
        // Si l'adresse existe, renvoyez-la au frontend
        res.json({ success: true, Address });
      } else {
        // Si l'adresse n'existe pas, renvoyez un message indiquant que l'adresse n'a pas été trouvée
        res.json({ success: false, message: 'Address not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },

  // Autres fonctions de contrôleur ici...
};

module.exports = adressController;
