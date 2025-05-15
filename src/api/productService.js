import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // ITX API base URL loaded from .env file
const TIMEOUT = 25000; // Timeout for requests

// Create an axios instance with the base URL and timeout
export const api = axios.create({
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
    return response.data;
  } catch (error) {
    console.error('Error fetching products list:', error);
    throw new Error('Error fetching product list');
  }
};

// Get a single product by ID from the API
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Error fetching product');
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
    throw new Error('Error adding product to cart');
  }
};
