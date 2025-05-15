import { Link, useParams } from 'react-router-dom';
import { getProduct, addToCart } from '../api/productService';
import { useState, useCallback } from 'react';
import { useCartContext } from '../context/CartContext';
import { useCache } from '../hooks/useCache';
import styles from './ProductDetails.module.css';
import Image from '../components/Image';
import Description from '../components/Description';
import Actions from '../components/Actions';

const ProductDetails = () => {
  const { id } = useParams();
  const fetchProduct = useCallback(() => getProduct(id), [id]); // Memoized function to avoid re-creating the function on every render
  const { data: product = {}, loading, error } = useCache(`pd${id}`, fetchProduct); // Fetch product details from cache using id as key
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color action
  const [selectedStorage, setSelectedStorage] = useState(null); // State for selected storage action
  const { setCount } = useCartContext(); // Get setCount function from CartContext
  const [isPending, setIsPending] = useState(false); // State for pending status on add to cart action

  // Add product to cart
  const handleAddToCart = async (product) => {
    setIsPending(true); // Set pending to true before adding to cart
    try {
      const res = await addToCart(product); // Call addToCart function from api service
      setCount(res.count); // Dispatch new count value and update cart context
      console.log('Product added to cart:', product); // TODO Implement add to cart functionality
    } catch (error) {
      console.error('Error adding product to cart:', error); // TODO Display error on UI
    }
    setIsPending(false); // Set pending to false after adding to cart
  };

  // Handle color change (Action)
  const handleChangeColor = (color) => {
    setSelectedColor(color); // Set selected color
  };
  // Handle storage change (Action)
  const handleChangeStorage = (storage) => {
    setSelectedStorage(storage); // Set selected storage
  };

  return loading ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className={styles.productDetailsContainer}>
      <Link to="/" className={styles.backLink}>
        ← Back
      </Link>

      <div className={styles.detailContainer}>
        <div className={styles.imageSection}>
          <Image product={product} />
        </div>

        <div className={styles.infoSection}>
          <Description product={product} />

          <Actions
            product={product}
            handleAddToCart={handleAddToCart}
            selectedColor={selectedColor}
            selectedStorage={selectedStorage}
            handleChangeColor={handleChangeColor}
            handleChangeStorage={handleChangeStorage}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
