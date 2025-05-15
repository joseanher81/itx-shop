import { useEffect, useState } from 'react';
import { getProducts } from '../api/productService';
import { useCache } from '../hooks/useCache'; // Import the useCache hook
import ProductItem from '../components/ProductItem';
import styles from './ProductList.module.css';
import Search from '../components/Search';
import Loading from '../components/Loading';

const ProductList = () => {
  const { data: products = [], loading, error } = useCache('productsList', getProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');

  // Filter products based on the search query
  useEffect(() => {
    if (!products) return; // If no products, do nothing

    const queryResult = products.filter((product) => {
      if (!query) return true; // If no query, show all products
      const fullname = `${product.brand} ${product.model}`; // Concatenate brand and model for search
      return fullname.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredProducts(queryResult);
  }, [query, products]);

  if (loading) return <Loading />; // Show loading spinner while fetching data

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
