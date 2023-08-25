<template>
  <div class="container">
    <h2 class="my-orders__heading">Validate</h2>
    <div v-if="showSuccessMessage" class="login__alert base-alert base-alert__success"><span class="base-alert__message">delivry validate</span></div>
    <div class="my-orders__content">
      <h3 class="my-orders__content-title">Delivry</h3>
      <div id="app">
      <table>
        <thead>
            <tr>
              <th>Delivry ID</th>
              <th>First name</th>
               <th>Last name</th>
               <th>Siret</th>
              <th>Weight</th>
            </tr>
        </thead>
        <tbody>
          <tr v-if="drivers.length > 0" v-for="(driver, index) in drivers" :key="index">
            <template v-if="driver.active === 0">
            <td>{{driver._id}}</td>
              <td>{{ driver.deliveryService }}</td>
              <td>{{ driver.firstName }}</td>
              <td>{{ driver.lastName }}</td>
              <td>{{ driver.poids }}</td>
            <td>
              <button
                  type="button"
                  @click="validateDriver(driver._id, driver.active)"
                  :disabled="driver.active !== 0"
                >
                  Activate
                </button>
            </td>
          </template>
          </tr>
          <tr v-if="drivers.length == 0">
              <td colspan="5">No orders available.</td>
            </tr>
        </tbody>
      </table>
  
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "MyOrdersPage",
  data() {
    return {
      drivers: [] ,
      showSuccessMessage: false// Array pour stocker les commandes
    };
  },
  mounted() {
    this.fetchOrders(); // Appeler la méthode pour récupérer les commandes au chargement du composant
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('/delivry/get-delivery-drivers'); // Remplacez par l'URL correcte pour récupérer les livreurs
        this.drivers = response.data.drivers;
        console.log(this.drivers) // Mettre à jour le tableau des livreurs avec les données récupérées
      } catch (error) {
        console.error(error);
      }
    }, 
    async validateDriver(driverId, activeStatus) {
      try {
        // Inverser l'état actif
        
        const response = await axios.put('/delivry/update-driver-status', {
          driverId,
          active: 1
        });
        
        this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
      location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    
  }
};


</script>

<style lang="scss">
.my-orders {
  &__heading {
    color: $color-dark;
    font-size: 20px;
    font-family: $base-font;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.1px;
    margin-bottom: 16px;
  }

  &__content {
    border: 1px solid $color-grey-lightest;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
  }

  &__content-title {
    color: $color-dark;
    font-family: $base-font;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.1px;
    margin-bottom: 16px;
  }
}
table , tr,td , th{
  border: 1px solid black;
  padding: 10px;
}
button.newItem {
  padding: 5px;
  margin: 14px 0 0 0;
  font-weight: bold;
  font-size: 16px;
}
</style>
