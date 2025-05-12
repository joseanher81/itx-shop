import { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';
import ProductItem from '../components/ProductItem';
import styles from './ProductList.module.css';
import Search from '../components/Search';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');

  // Fetch products from the API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data); // Set all products from api
        setFilteredProducts(data); // Initialize filtered products with all products
        console.log('Products:', data);
      } catch (error) {
        console.error('Error fetching products:', error); // TODO Display error on UI
      }
    };
    loadProducts();
  }, []);

  // Filter products based on the search query
  useEffect(() => {
    const queryResult = products.filter((product) => {
      if (!query) return true; // If no query, show all products
      const fullname = `${product.brand} - ${product.model}`; // Concatenate brand and model for search
      return fullname.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredProducts(queryResult);
  }, [query, products]);

  return (
    <div className="container">
      <Search query={query} setQuery={setQuery} />

      <div className={styles.productListGrid}>
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
