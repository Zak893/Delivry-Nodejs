<template>
    <div class="container">
      <h2 class="my-orders__heading">ALL</h2>
      <div class="my-orders__content">
        <h3 class="my-orders__content-title">Users</h3>
        <div id="app">
        <table>
          <thead>
              <tr>
                <th>User ID</th>
                <th>First name</th>
                 <th>Last name</th>
                 <th>Email</th>
                <th>Phone</th>
              </tr>
          </thead>
          <tbody>
            <tr v-if="drivers.length > 0" v-for="(driver, index) in drivers" :key="index">
              <td>{{driver._id}}</td>
                <td>{{ driver.email }}</td>
                <td>{{ driver.firstName }}</td>
                <td>{{ driver.lastName }}</td>
                <td>{{ driver.phoneNumber }}</td>
            </tr>
            <tr v-if="drivers.length == 0">
                <td colspan="5">No user available.</td>
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
        showSuccessMessage: false// Array pour stocker les commandes
      };
    },
    mounted() {
      this.fetchOrders(); // Appeler la méthode pour récupérer les commandes au chargement du composant
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await axios.get('/user/get-users'); // Remplacez par l'URL correcte pour récupérer les livreurs
          this.drivers = response.data.drivers;
          console.log(this.drivers) // Mettre à jour le tableau des livreurs avec les données récupérées
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
  