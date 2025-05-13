import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductList from '../pages/ProductList';
import ProductDetails from '../pages/ProductDetails';
import NotFound from '../components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ProductList /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: '*', element: <NotFound /> }, // Unmatched routes display NotFound component
    ],
  },
]);
