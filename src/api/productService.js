import axios from 'axios';

const BASE_URL = 'https://itx-frontend-test.onrender.com/api'; // ITX API base URL
const TIMEOUT = 20000; // Timeout for requests

// Create an axios instance with the base URL and timeout
const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all products from the API
export const getProducts = async () => {
  try {
    const response = await api.get('/product');
    console.log('Fetched products:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
