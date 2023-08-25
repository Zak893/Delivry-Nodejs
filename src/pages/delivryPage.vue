<template>
    <div class="container">
      <h2 class="my-orders__heading">Active</h2>
      <div class="my-orders__content">
        <h3 class="my-orders__content-title">Delivry</h3>
        <div id="app">
        <table>
          <thead>
              <tr>
                <th>User ID</th>
                <th>First name</th>
                 <th>Last name</th>
                 <th>Email</th>
                <th>Phone</th>
                <th>Siret</th>
                <th>Weight</th>
                <th>Global Rate</th>
              </tr>
          </thead>
          <tbody>
            <tr v-if="drivers.length > 0" v-for="(driver, index) in drivers" :key="index">
                <template v-if="driver.active === 1">
              <td>{{driver._id}}</td>
                <td>{{ driver.email }}</td>
                <td>{{ driver.firstName }}</td>
                <td>{{ driver.lastName }}</td>
                <td>{{ driver.phoneNumber }}</td>
                <td>{{ driver.deliveryService }}</td>
                <td>{{ driver.poids }}</td>
                <td>{{ calculateAverageRate(driver._id) }}</td>
                </template>

            </tr>
            <tr v-if="drivers.length == 0">
                <td colspan="5">No delivry available.</td>
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
    name: "MyusersPage",
    data() {
      return {
        drivers: [] ,
        showSuccessMessage: false,// Array pour stocker les commandes
        orders: [] ,
        rate: []
      };
    },
    mounted() {
      this.fetchOrders(); // Appeler la méthode pour récupérer les commandes au chargement du composant
      this.fetchRate();
    },
    methods: {
        async fetchRate(email) {
    try {
      const response = await axios.get(`/get-del-orders/${email}`);
      return response.data.orders;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  
  async fetchOrders() {
    try {
      const response = await axios.get('/delivry/get-delivery-drivers');
      this.drivers = response.data.drivers;
      var tab = [];
      for (var i =0; i< this.drivers.length ; i++) {
       if(this.drivers[i].active){
        const driverRate = await this.fetchRate(this.drivers[i].email);
        tab[i]= driverRate;
       }
      }
      this.rate = tab;
      console.log(tab)
    } catch (error) {
      console.error(error);
    }
  },
      calculateAverageRate(driverId) {
    const driverOrders = this.orders.filter(order => order.driverId === driverId);
    if (driverOrders.length > 0) {
      const totalRate = driverOrders.reduce((sum, order) => sum + order.rate, 0);
      return (totalRate / driverOrders.length).toFixed(2); // Calculate average and round to 2 decimal places
    }
    return 'N/A'; // Return N/A if no orders
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
  