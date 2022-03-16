<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">My awesome store</div>

      <v-spacer></v-spacer>
      <v-btn href="/#/" text>
        <span class="mr-2">Catalog</span>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>
      <v-btn style="margin-right: 50px" href="/#/Checkout-cart" text>
        <v-badge
          v-if="numberOfProductsInCart"
          color="green"
          :content="badgeValue"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar color="red accent-2" v-model="showSnackbar" timeout="5000">
      {{ clientError }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import httpService from "./api/HttpService";
import {
  SET_PRODUCT_CATALOG,
  CLIENT_ERROR,
  GET_PRODUCTS_IN_CART,
  GET_TOTAL_PRICE,
  SHOW_SNACK_BAR,
} from "./store/index";
export default {
  name: "App",
  computed: {
    clientError() {
      return this.$store.state[CLIENT_ERROR];
    },
    showSnackbar() {
      return this.$store.state[SHOW_SNACK_BAR];
    },
    totalPrice() {
      return this.$store.getters[GET_TOTAL_PRICE];
    },
    numberOfProductsInCart() {
      return this.$store.getters[GET_PRODUCTS_IN_CART].length;
    },
    badgeValue() {
      return this.numberOfProductsInCart + " ( " + this.totalPrice + "$ )";
    },
  },
  watch: {
    showSnackbar() {
      setTimeout(() => {
        this.$store.commit("setShowSnackbar", false);
      }, 5000);
    },
  },
  created() {
    httpService
      .getProducts()
      .then((response) => {
        this.$store.commit(SET_PRODUCT_CATALOG, response.data[0]);
      })
      .catch((e) => {
        this.$store.commit(
          CLIENT_ERROR,
          "An error has occurred during fetching data from the server"
        );
        console.log(e);
      });
  },
};
</script>