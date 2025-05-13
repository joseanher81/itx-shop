import axios from 'axios';

const BASE_URL = '/api'; // ITX API base URL
const TIMEOUT = 20000; // Timeout for requests

// Create an axios instance with the base URL and timeout
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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

// Get a single product by ID from the API
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    console.log('Fetched product:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Add a product to the cart
export const addToCart = async ({ id, colorCode, storageCode }) => {
  try {
    const response = await api.post('/cart', {
      id,
      colorCode,
      storageCode,
    });

    console.log('Product added to cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};
