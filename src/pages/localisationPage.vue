<template>
  <div class="container">
    <h2 class="my-orders__heading">Localisation</h2>
    <div class="my-orders__content" style="
    width: fit-content;
">
      <h3 class="my-orders__content-title">Delivry</h3>
      <div id="app">
      <table>
        <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
               <th>Addres</th>
               <th>MapView east</th>
               <th>MapView north</th>
               <th>MapView south</th>
               <th>MapView west</th>

            </tr>
        </thead>
        <tbody>
          <tr v-if="drivers.length > 0" v-for="(driver, index) in drivers" :key="index">
            <td>{{driver._id}}</td>
              <td>{{ driver.email}}</td>
              <td>{{ driver.adress+' , '+driver.complement+' , '+driver.postal }}</td>
              <td>{{ mapViews[index].east }}</td>
              <td>{{ mapViews[index].north }}</td>
              <td>{{ mapViews[index].south }}</td>
              <td>{{ mapViews[index].west }}</td>
              <td><iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d320566.79046210815!2d6.0074284!3d49.6125314!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDnCsDM2JzIxLjMiTiA2wrAwNyc1NC41IkU!5e1!3m2!1sfr!2sfr!4v1692982931660!5m2!1sfr!2sfr" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></td>
          </tr>
          <tr v-if="drivers.length == 0">
              <td colspan="5">No delivry Localisation available.</td>
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
  name: 'YourComponentName',
  data() {
      return {
        drivers: [] ,
        mapViews: [] ,
        cordonees: [] ,
      };
    },
  mounted() {
    this.fetchGeocodeData();
    console.log(this.drivers)



  },
  methods: {
    async fetchGeocodeData() {
    const apiKey = 'aPrWU6Uw8tE7zNLA_FkthYgHNY0yV2PUo6RnoVa3h1I';
    var url ='';
    try {
      const response = await axios.get('/get-delivry-address');
      this.drivers = response.data.drivers;
       let map = [];
       let cordones = [];
      for (let index = 0; index < this.drivers.length; index++) {
        let Address = this.drivers[index].adress+' , '+this.drivers[index].ville;

          const response = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${Address}&apiKey=${apiKey}`);
         console.log(response.data.items[0])
          map[index] = response.data.items[0]?.mapView || null;
          cordones[index] = response.data.items[0]?.position || null;

      }
      this.mapViews = map;
      this.cordonees = cordones;
      const inputCoordinates =  this.mapViews[0].north+'N '+this.mapViews[0].east+'E';
      const formattedCoordinates = this.formatCoordinates(inputCoordinates);
      var y = "https://www.google.com/maps/place/"+formattedCoordinates+"/@"+this.cordonees[0].lat+","+this.cordonees[0].lng+",400m/data=!4m4!3m3!8m2!3d48.7572778!4d2.2405?entry=ttu"

console.log(y);
    } catch (error) {
      console.error(error);
    }
  },
   formatCoordinates(input) {
    const [latitude, longitude] = input.split(/[NnEe]/);
    const latDegrees = parseInt(latitude);
    const latMinutes = Math.floor((latitude - latDegrees) * 60);
    const latSeconds = ((latitude - latDegrees - latMinutes / 60) * 3600).toFixed(1);

    const lonDegrees = parseInt(longitude);
    const lonMinutes = Math.floor((longitude - lonDegrees) * 60);
    const lonSeconds = ((longitude - lonDegrees - lonMinutes / 60) * 3600).toFixed(1);

    return `${latDegrees}°${latMinutes}'${latSeconds}"N+${lonDegrees}°${lonMinutes}'${lonSeconds}"E`;
}
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
