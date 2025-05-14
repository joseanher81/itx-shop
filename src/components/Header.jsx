import { Link, useLocation } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

import styles from './Header.module.css';

const Header = () => {
  const { count } = useCartContext(); // Get count from CartContext
  const location = useLocation();

  // Display breadcrumbs based on the current location
  const displayBreadcrumbs = () => {
    if (location.pathname === '/') return 'Home';
    if (location.pathname.startsWith('/product/')) {
      return (
        <>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>{' '}
          / Product Details
        </>
      );
    }
    return null;
  };

  return (
    <header className={`container ${styles.header}`}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          ITX Shop
        </Link>
        <nav className={styles.breadcrumbs}>{displayBreadcrumbs()}</nav>
      </div>

      <div className={styles.cart}>
        <FaShoppingCart size={18} color="#1069cf" /> <span>{count}</span>
      </div>
    </header>
  );
};

export default Header;
