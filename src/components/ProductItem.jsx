const ProductItem = ({ product }) => {
  return (
    <div>
      <img src={product.imgUrl} alt={product.model} />
      <h2>{product.brand}</h2>
      <p>{product.model}</p>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductItem;
