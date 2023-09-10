import axios from 'axios';

const API_CART_URL = 'http://localhost:8080/admin/api/cart';
const API_BILL_URL = 'http://localhost:8080/admin/api/bill';
const API_PRODUCT_URL = "http://localhost:8080/admin/api/product/getallproductdetail"

const getAllProduct = () => {
    return axios.get(API_PRODUCT_URL)
}

const getAllCart = () => {
    return axios.get(API_CART_URL);
};

const createCart = (request) => {
    return axios.post(API_CART_URL, request);
};

const getAllBill = () => {
    return axios.get(API_BILL_URL);
}

export { getAllCart, createCart, getAllBill, getAllProduct };