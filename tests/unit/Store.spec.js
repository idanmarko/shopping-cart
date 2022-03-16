import products from "@/modules/product/products.dummy";
import cloneDeep from "lodash/cloneDeep";
import {
  mutations,
  getters,
  actions,
  state,
  GET_TOTAL_PRICE,
  SET_PRODUCT_CATALOG,
  ADD_PRODUCT_TO_CART,
  PRODUCT_REDUCE_FROM_INVENTORY,
} from "@/store/index";
// const {
//   SET_PRODUCT_CATALOG,
//   ADD_PRODUCT_TO_CART,
//   PRODUCT_REDUCE_FROM_INVENTORY,
// } = mutations;
const { ADD_PRODUCT_TO_CART_AND_REDUCE_FROM_INVENTORY } = actions;

describe("main store", () => {
  let localState;
  let commit;
  beforeEach(() => {
    jest.clearAllMocks();
    commit = jest.fn();
    localState = cloneDeep(state);
  });

  test("SET_PRODUCT_CATALOG should populate product collection ", async () => {
    mutations[SET_PRODUCT_CATALOG](localState, products.products);
    expect(localState.products).toHaveLength(products.products.length);
  });

  test("ADD_PRODUCT_TO_CART should add one product to productsInCart collection ", async () => {
    let product = products.products[2];
    mutations[ADD_PRODUCT_TO_CART](localState, product);
    expect(localState.productsInCart).toHaveLength(1);
    expect(localState.productsInCart[0].product.id).toBe(3);
  });

  test("PRODUCT_REDUCE_FROM_INVENTORY  reduce amount of products in stock ", async () => {
    mutations[SET_PRODUCT_CATALOG](localState, products.products);

    mutations[PRODUCT_REDUCE_FROM_INVENTORY](localState, products.products[0]);
    expect(localState.products[0].amountInstock).toBe(11);
  });

  test("ADD_PRODUCT_TO_CART_AND_REDUCE_FROM_INVENTORY should call mutations ADD_PRODUCT_TO_CART &  PRODUCT_REDUCE_FROM_INVENTORY ", async () => {
    mutations[SET_PRODUCT_CATALOG](localState, products.products);

    const product = {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
      amountInstock: 12,
    };

    ADD_PRODUCT_TO_CART_AND_REDUCE_FROM_INVENTORY({ commit }, product);
    expect(commit).toHaveBeenCalledWith(ADD_PRODUCT_TO_CART, product);
    expect(commit).toHaveBeenCalledWith(PRODUCT_REDUCE_FROM_INVENTORY, product);
  });

  test("GET_TOTAL_PRICE should return price of all products multiply by the amount in the cart ", async () => {
    mutations[SET_PRODUCT_CATALOG](localState, products.products);

    const product = {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
      amountInstock: 12,
    };

    mutations[ADD_PRODUCT_TO_CART](localState, product);
    mutations[ADD_PRODUCT_TO_CART](localState, product);
    mutations[ADD_PRODUCT_TO_CART](localState, product);

    let totalPrice = localState.productsInCart[0].amount * product.price;

    const result = getters[GET_TOTAL_PRICE](localState);
    expect(result).toBe(totalPrice);
  });
});
