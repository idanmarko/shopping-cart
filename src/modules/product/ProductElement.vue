<template>
  <v-card class="mx-auto my-12 product-card" style="height: 40em">
    <div>
      <v-img
        contain
        class="text-h6 mb-1"
        aspect-ratio="1"
        max-width="500"
        max-height="300"
        :src="productItem.image"
      ></v-img>
    </div>
    <v-card-title class="product-title">{{ productItem.title }}</v-card-title>
    <v-card-text style="flex: 1">
      <v-row align="center" class="mx-0">
        <v-rating
          :value="productItem.rating.rate"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          {{ productItem.rating.rate }} ({{ productItem.rating.count }})
        </div>
      </v-row>
      <br />
      <div class="product-description">
        {{ productItem.description }}
      </div>
    </v-card-text>
    <v-chip label outlined color="orange" class="amount-in-stock">
      <span 
        :class="{ 'last-product-in-stock': productItem.amountInstock <= 2 }"
        v-if="productItem.amountInstock > 0"
      >
        Only {{ productItem.amountInstock }} left
      </span>
      <span v-else style="color: red"> This product is unavaliable </span>
    </v-chip>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-btn
        :disabled="productItem.amountInstock <= 0"
        color="deep-purple lighten-2"
        text
        @click="addToCart"
      >
        Add to cart ${{ productItem.price }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductElement",
  props: {
    productItem: {
      id: Number,
      title: String,
      image: String,
      description: String,
      price: Number,
      amountInstock: Number,
      rating: {
        rate: Number,
        rating: Number,
      },
    },
  },
  methods: {
    addToCart() {
      this.$store.dispatch("ADD_PRODUCT_TO_CART_AND_REDUCE_FROM_INVENTORY", this.productItem);
    },
  },
};
</script>

<style scoped>
.last-product-in-stock {
  color: red;
}
.product-description {
  overflow-y: auto;
  max-height: 9em;
}
.product-title {
  font-size: 1em;
  word-break: break-word;
}
.product-card {
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
}

.amount-in-stock {
  justify-content: center;
  font-weight: bold;
}
</style>