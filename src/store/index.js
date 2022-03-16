import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//mutations
export const CLIENT_ERROR = "CLIENT_ERROR";
export const SHOW_SNACK_BAR = "SHOW_SNACK_BAR";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const SET_PRODUCT_CATALOG = "SET_PRODUCT_CATALOG";
export const PRODUCT_REDUCE_FROM_INVENTORY = "PRODUCT_REDUCE_FROM_INVENTORY";

//actions
export const ADD_PRODUCT_TO_CART_AND_REDUCE_FROM_INVENTORY =
  "ADD_PRODUCT_TO_CART_AND_REDUCE_FROM_INVENTORY";

//getters
export const GET_TOTAL_PRICE = "GET_TOTAL_PRICE";
export const GET_PRODUCTS_IN_CART = "GET_PRODUCTS_IN_CART";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const state = {
  clientError: 0,
  showSnackbar: false,
  productsInCart: [],
  products: [],
};
export const getters = {
  [SHOW_SNACK_BAR]: (state) => state.showSnackbar,
  [CLIENT_ERROR]: (state) => state.CLIENT_ERROR,
  [GET_PRODUCTS_IN_CART]: (state) => state.productsInCart,
  [GET_PRODUCTS]: (state) => state.products,
  [GET_TOTAL_PRICE](state) {
    let price = 0;
    state.productsInCart.forEach((element) => {
      if (price == 0) {
        price = element.amount * element.product.price;
      } else {
        price += element.amount * element.product.price;
      }
    });
    return price;
  },
};
export const mutations = {
  increment: (state) => state.count++,

  [CLIENT_ERROR](state, errorMessage) {
    state.clientError = errorMessage;
    state.showSnackbar = true;
  },
  [SHOW_SNACK_BAR](state, showSnackbar) {
    state.showSnackbar = showSnackbar;
  },
  [ADD_PRODUCT_TO_CART](state, product) {
    var currentProducInCart = state.productsInCart.filter((a) => {
      return a.product.id == product.id;
    });
    if (currentProducInCart.length > 0) {
      currentProducInCart[0].amount += 1;
    } else {
      state.productsInCart.push({
        product: product,
        amount: 1,
      });
    }
  },
  [SET_PRODUCT_CATALOG](state, products) {
    state.products = products;
  },
  [PRODUCT_REDUCE_FROM_INVENTORY](state, product) {
    var products = state.products.filter((a) => {
      return a.id == product.id;
    });
    if (products.length > 0) {
      products[0].amountInstock -= 1;
    }
  },
};
export const actions = {
  [ADD_PRODUCT_TO_CART_AND_REDUCE_FROM_INVENTORY]({ commit }, product) {
    commit(ADD_PRODUCT_TO_CART, product);
    commit(PRODUCT_REDUCE_FROM_INVENTORY, product);
  },
};

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
});
