const ProductItem = ({ product }) => {
  return (
    <div>
      <img src={product.imgUrl} alt={product.model} style={styles.image} />
      <h2 style={styles.brand}>{product.brand}</h2>
      <p style={styles.model}>{product.model}</p>
      <p style={styles.price}>${product.price}</p>
    </div>
  );
};

export default ProductItem;
