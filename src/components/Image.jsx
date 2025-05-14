const Image = ({ product }) => {
  return <img src={product.imgUrl} alt={product.model} />;
};
export default Image;
