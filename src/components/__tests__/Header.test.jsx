import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

describe('Header', () => {
  const renderWithCartContext = (count = 0) => {
    return render(
      <BrowserRouter>
        <CartContext.Provider value={{ count }}>
          <Header />
        </CartContext.Provider>
      </BrowserRouter>
    );
  };

  it('displays the number of products in cart', () => {
    renderWithCartContext(5);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('displays link to home page', () => {
    renderWithCartContext();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
