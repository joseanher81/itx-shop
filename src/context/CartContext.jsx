import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// Custom hook to use the CartContext
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

// Context initial state
const initialState = {
  count: 0,
  cart: [],
};

// For this app it was enough to use a simple useState hook, but this way is more scalable :)
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
        //count: state.count + 1, // At present this is set by the API response
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        //count: state.count > 0 ? state.count - 1 : 0, // At present this is set by the API response
      };
    case 'SET_COUNT':
      return {
        ...state,
        count: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // It is a better practice to use the length of the cart array to get the count of items in the cart (but the Test asked to use the count from the API response)
  const setCount = (count) => {
    dispatch({ type: 'SET_COUNT', payload: count });
  };

  // Unused for now
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  // Unused for now
  const clearCart = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, setCount, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, cartReducer }; //For testing purposes
