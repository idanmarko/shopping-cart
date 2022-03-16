<template>
  <v-card class="check-out-card" elevation="8" style="">
    <v-card-title> My cart </v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">Product</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Subtotal</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="productElement in productsInCart"
            :key="productElement.product.id"
          >
            <td>
              <v-img
                contain
                class="text-h6 mb-1"
                aspect-ratio="1"
                max-width="250"
                max-height="150"
                :src="productElement.product.image"
              ></v-img>
            </td>
            <td>{{ productElement.product.title }}</td>
            <td>{{ productElement.product.price }} $</td>
            <td>{{ productElement.amount }}</td>
            <td>
              {{ productElement.amount * productElement.product.price }} $
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="total-price">
              Total {{ TotalPriceOfProductsInCart }} $
            </td>
            <td class="total-price">
              <v-btn v-if="productsInCart.length>0" color="green lighten-2" v-on:click="Checkout"> Checkout </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { GET_TOTAL_PRICE, GET_PRODUCTS_IN_CART } from "../../store/index";

export default {
  name: "CheckoutCart",
  computed: {
    productsInCart() {
      return this.$store.getters[GET_PRODUCTS_IN_CART];
    },
    TotalPriceOfProductsInCart() {
      return this.$store.getters[GET_TOTAL_PRICE];
    },
  },
  methods:{
    Checkout(){
        this.$swal("Product purchase completed",'Thank you',"success");
    }
  }
};
</script>
<style scoped>
.check-out-card {
  padding: 5em;
  margin: 5em;
}
.total-price {
  font-weight: bold;
}
</style>