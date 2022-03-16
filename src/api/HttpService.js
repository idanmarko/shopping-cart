import axios from "axios";
const backEndUrl = "http://localhost:3000/";

async function getProducts() {
  return axios.get(backEndUrl + "products");
}

const httpService = {
    getProducts:getProducts,
};

export default httpService;
