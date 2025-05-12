import { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        console.log('Products:', data); // TODO Display products on UI
      } catch (error) {
        console.error('Error fetching products:', error); // TODO Display error on UI
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {/* Product list content */}
    </div>
  );
};
export default ProductList;
