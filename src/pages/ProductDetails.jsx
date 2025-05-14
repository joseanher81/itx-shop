import { Link, useParams } from 'react-router-dom';
import { getProduct, addToCart } from '../api/productService';
import { useState, useEffect } from 'react';
import { useCartContext } from '../context/CartContext'; // Import the CartContext
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({}); // State for product details
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color action
  const [selectedStorage, setSelectedStorage] = useState(null); // State for selected storage action
  const [loading, setLoading] = useState(true); // State for loading status
  const { setCount } = useCartContext(); // Get setCount function from CartContext

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
    try {
      const res = await addToCart(product); // Call addToCart function from api service
      setCount(res.count); // Dispatch new count value and update cart context
    } catch (error) {
      console.error('Error adding product to cart:', error); // TODO Display error on UI
    }
    console.log('Product added to cart:', product); // TODO Implement add to cart functionality
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
          <img src={product.imgUrl} alt={product.model} />
        </div>

        <div className={styles.infoSection}>
          <h1>
            {product.brand} - {product.model}
          </h1>
          <p className={product.price ? styles.price : `${styles.price} ${styles.notAvailable}`}>
            {product.price ? `${product.price} €` : 'Not available'}
          </p>
          <ul className={styles.specifications}>
            <li>
              <strong>CPU:</strong> {product.cpu ? product.cpu : 'Not available'}
            </li>
            <li>
              <strong>RAM:</strong> {product.ram ? product.ram : 'Not available'}
            </li>
            <li>
              <strong>OS:</strong> {product.os ? product.os : 'Not available'}
            </li>
            <li>
              <strong>Screen Resolution:</strong>{' '}
              {product.displayResolution ? product.displayResolution : 'Not available'}
            </li>
            <li>
              <strong>Battery:</strong> {product.battery ? product.battery : 'Not available'}
            </li>
            <li>
              <strong>Cameras:</strong>{' '}
              {product.primaryCamera || product.secondaryCamera
                ? `${product.primaryCamera || 'N/A'} / ${product.secondaryCmera || 'N/A'}`
                : 'Not available'}
            </li>
            <li>
              <strong>Dimensions:</strong>{' '}
              {product.dimentions ? product.dimentions : 'Not available'}
            </li>
            <li>
              <strong>Weight:</strong> {product.weight ? `${product.weight}g` : 'Not available'}
            </li>
          </ul>

          <div className={styles.actions}>
            <label>
              Almacenamiento:
              <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)}>
                {product.options.storages.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Color:
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {product.options.colors.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            className={styles.addButton}
            onClick={() =>
              handleAddToCart({
                id: product.id,
                colorCode: selectedColor,
                storageCode: selectedStorage,
              })
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
