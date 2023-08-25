<template>
   
</template>

<script>
import Vue from 'vue';
export default {
  name: "orders",
};

new Vue({
  data(){
    return {
      items: [
        {
          name: '',
          quantity: 0,
          amount: 0,
          total: 0
        }
      ]
    }
  },
  watch: {
    'items': {
      handler (newValue, oldValue) {
        newValue.forEach((item) => {
          item.total = item.quantity * item.amount
        })
      },
      deep: true
    }
  },
  methods: {
    AddItem(){
      this.items.push({
        name: '',
        quantity: 0,
        amount: 0,
        total: 0
      })
    },
    removeItem(){
      this.items.splice(this.items, 1)
    }
  }
}).$mount("#app")
</script>

<style lang="scss">
table , tr,td {
  border: 1px solid black;
  padding: 10px;
  width: 50%;
}
button.newItem {
  padding: 5px;
  margin: 14px 0 0 0;
  font-weight: bold;
  font-size: 16px;
}
</style>
