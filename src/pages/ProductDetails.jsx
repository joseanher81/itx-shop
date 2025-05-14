import { Link, useParams } from 'react-router-dom';
import { getProduct, addToCart } from '../api/productService';
import { useState, useEffect } from 'react';
import { useCartContext } from '../context/CartContext'; // Import the CartContext
import styles from './ProductDetails.module.css';
import Image from '../components/Image';
import Description from '../components/Description';
import Actions from '../components/Actions';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({}); // State for product details
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color action
  const [selectedStorage, setSelectedStorage] = useState(null); // State for selected storage action
  const [loading, setLoading] = useState(true); // State for loading status
  const { setCount } = useCartContext(); // Get setCount function from CartContext
  const [isPending, setIsPending] = useState(false); // State for pending status

  // Fetch product details from the API
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await getProduct(id);
        setProduct(data); // Set single product details from api
        setSelectedColor(data.options.colors?.[0]?.code || ''); // Set default color
        setSelectedStorage(data.options.storages?.[0]?.code || ''); // Set default storage
        console.log('Product:', data);
      } catch (error) {
        console.error('Error fetching product:', error); // TODO Display error on UI
      }
      setLoading(false); // Set loading to false after fetching
    };
    loadProduct();
  }, [id]);

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
