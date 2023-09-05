import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cart';

const getAll = (page) => {
    return axios.get(API_URL, { params: { page } });
};

const createCart = (request) => {
    return axios.post(API_URL, request);
};

export { getAll, createCart };