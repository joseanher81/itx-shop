import styles from './Description.module.css';

const Description = ({ product }) => {
  return (
    <>
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
          <strong>Dimensions:</strong> {product.dimentions ? product.dimentions : 'Not available'}
        </li>
        <li>
          <strong>Weight:</strong> {product.weight ? `${product.weight}g` : 'Not available'}
        </li>
      </ul>
    </>
  );
};

export default Description;
