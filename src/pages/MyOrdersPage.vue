<template>
  <div class="container">
    <h2 class="my-orders__heading">My Orders</h2>

    <div class="my-orders__content">
      <h3 class="my-orders__content-title">Orders list</h3>
      <div id="app">
      <table>
        <thead>
            <tr>
              <th>Order ID</th>
              <th>Weight</th>
               <th>Delivery address</th>
               <th>Delivery name</th>
              <th>Rate /10</th>
            </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length > 0" v-for="(order, index) in orders" :key="index">
            <td>{{index + 1}}</td>
              <td>{{ order.poids }}</td>
              <td>{{ order.adress+' '+order.complement+' '+order.postal }}</td>
              <td v-if="order.Del != null">{{ order.Del }} brings your order back to you</td>
              <td v-if="order.Del == null">please wait for a delivery person to take your order...</td>
              <template v-if="order.Del != null && order.rate == 0">
            <td >
              <select v-model="selectedRates[index]" >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </td>
            <td ><button @click="saveRate(index)">
  Save
</button></td></template>
<td v-if="order.Del != null && order.rate > 0">{{ order.rate }}</td>
          </tr>
          <tr v-if="orders.length == 0">
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
      orders: [], // Array pour stocker les commandes
      selectedRates: {}, // Object to store the selected rate for each order

    };
  },
  mounted() {
    this.fetchOrders(); // Appeler la méthode pour récupérer les commandes au chargement du composant
  },
  methods: {
    async fetchOrders() {
      const userEmail = localStorage.getItem('userEmail'); // Récupérer l'e-mail de l'utilisateur depuis localStorage
      try {
        
        const response = await axios.get(`/get-orders?email=${userEmail}`); // Remplacez par l'URL correcte pour récupérer les commandes
        console.log(response.data.orders)
        this.orders = response.data.orders; // Mettre à jour le tableau des commandes avec les données récupérées
      } catch (error) {
        console.error(error);
      }
    },
    async saveRate(index) {
    try {
      const orderToUpdate = this.orders[index];
      const selectedRate = this.selectedRates[index];

      const response = await axios.put(`/update-order-rate/${orderToUpdate._id}`, {
        rate: selectedRate,
      });

      // Update the rate in the local data
      orderToUpdate.rate = selectedRate;
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
