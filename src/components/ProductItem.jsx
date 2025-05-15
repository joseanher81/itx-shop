import { Link } from 'react-router-dom';
import styles from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  return (
    <Link to={`product/${product.id}`} className={styles.card}>
      <img src={product.imgUrl} alt={product.model} className={styles.image} />

      <div className={styles.info}>
        <h2 className={styles.title}>
          {product.brand} {product.model}
        </h2>
        <p className={product.price ? styles.price : `${styles.price} ${styles.notAvailable}`}>
          {product.price ? `${product.price} €` : 'Not available'}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
