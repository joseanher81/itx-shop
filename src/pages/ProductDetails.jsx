import { Link, useParams } from 'react-router-dom';
import { getProduct, addToCart as apiAddToCart } from '../api/productService';
import { useState, useCallback, useEffect } from 'react';
import { useCartContext } from '../context/CartContext';
import { useCache } from '../hooks/useCache';
import { toast } from 'react-toastify';
import styles from './ProductDetails.module.css';
import Image from '../components/Image';
import Description from '../components/Description';
import Actions from '../components/Actions';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const fetchProduct = useCallback(() => getProduct(id), [id]); // Memoized function to avoid re-creating the function on every render
  const { data: product = {}, loading, error } = useCache(`pd${id}`, fetchProduct); // Fetch product details from cache using id as key
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color action
  const [selectedStorage, setSelectedStorage] = useState(null); // State for selected storage action
  const { setCount, addToCart } = useCartContext(); // Get setCount function from CartContext
  const [isPending, setIsPending] = useState(false); // State for pending status on add to cart action

  // Add product to cart
  const handleAddToCart = async (product) => {
    if (!selectedColor || !selectedStorage) {
      // Check if color and storage are selected
      alert('Selecciona color y almacenamiento');
      return;
    }

    setIsPending(true); // Set pending to true before adding to cart
    try {
      const res = await apiAddToCart(product); // Call addToCart function from api service
      setCount(res.count); // Dispatch new count value and update cart context
      addToCart(product); // Dispatch add product to cart context
      toast.success('Product added to cart!'); // Show success message
    } catch (error) {
      toast.error('Could not add to cart. Please try again.');
    }
    setIsPending(false); // Set pending to false after adding to cart
  };

  // Set default values for color and storage if not already set
  useEffect(() => {
    if (!product?.options) return;

    // Only set default values if they are not already set
    if (selectedColor === null && product.options.colors?.length > 0) {
      setSelectedColor(product.options.colors[0].code);
    }
    if (selectedStorage === null && product.options.storages?.length > 0) {
      setSelectedStorage(product.options.storages[0].code);
    }
  }, [product, selectedColor, selectedStorage]);

  // Handle color change (Action)
  const handleChangeColor = (color) => {
    setSelectedColor(color); // Set selected color
  };
  // Handle storage change (Action)
  const handleChangeStorage = (storage) => {
    setSelectedStorage(storage); // Set selected storage
  };

  if (loading) return <Loading />; // Show loading spinner while fetching data
  if (error) return <ErrorMessage message={error.message} />; // Show error message if fetching fails

  return (
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
