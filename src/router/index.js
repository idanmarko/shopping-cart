import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "products-collection",
    component: () => import("../modules/product/ProductsCollection.vue"),
  },
  {
    path: "/Checkout-cart",
    name: "Checkout-cart",
    component: () => import("../modules/cart/CheckoutCart.vue"),
  },
];

const router = new VueRouter({
  routes,
});
export default router;