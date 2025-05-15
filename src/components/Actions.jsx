import { FaShoppingCart } from 'react-icons/fa';
import styles from './Actions.module.css';

const Actions = ({
  product,
  handleAddToCart,
  selectedStorage,
  selectedColor,
  handleChangeStorage,
  handleChangeColor,
  isPending,
}) => {
  return (
    <>
      <div className={styles.actions}>
        <label>
          Almacenamiento:
          <select value={selectedStorage} onChange={(e) => handleChangeStorage(e.target.value)}>
            {product.options.storages.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Color:
          <select value={selectedColor} onChange={(e) => handleChangeColor(e.target.value)}>
            {product.options.colors.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Disable button if add to cart is pending or no price */}
      <button
        disabled={isPending || !product.price}
        className={styles.addButton}
        onClick={() =>
          handleAddToCart({
            id: product.id,
            colorCode: selectedColor,
            storageCode: selectedStorage,
          })
        }
      >
        {isPending ? (
          'Adding...'
        ) : (
          <>
            <FaShoppingCart className={styles.icon} />
            Add to cart
          </>
        )}
      </button>
    </>
  );
};
export default Actions;
