<template>
  <div>
    <v-container>
      <v-row v-if=" products && products.length > 0">
        <v-col
          v-for="productItem in products"
          :key="productItem.id"
          cols="12"
          md="3"
        >
          <v-container>
            <product-element :product-item="productItem" />
          </v-container>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="n in 4" :key="n" cols="12" md="3">
          <v-container>
            <v-card
              :loading="true"
              class="mx-auto my-12"
              style="height: 35em"
              max-width="374"
            >
              <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                type="card"
              ></v-skeleton-loader>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductElement from "./ProductElement.vue";
import {GET_PRODUCTS} from '../../store/index'
export default {
  name: "ProductsCollection",
  components: { ProductElement },
  computed: {
    products() {
      let items=this.$store.getters[GET_PRODUCTS];
      console.log(GET_PRODUCTS)
      return items;
    },
  },
};
</script>
