import styles from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.imgUrl} alt={product.model} className={styles.image} />

      <div className={styles.info}>
        <h2 className={styles.title}>
          {product.brand} - {product.model}
        </h2>
        <p className={styles.price}>{product.price ? `${product.price} €` : 'Not available'}</p>
      </div>
    </div>
  );
};

export default ProductItem;
