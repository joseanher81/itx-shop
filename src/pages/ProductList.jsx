import { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';
import ProductItem from '../components/ProductItem';
import styles from './ProductList.module.css';

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
    <div className="container">
      <h1>Product List</h1>
      <div className={styles.productListGrid}>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
