import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // 👈 necesario
import ProductItem from '../ProductItem';

describe('ProductItem', () => {
  const mockProduct = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 16 Pro',
    price: '1300',
  };

  it('displays product brand and model', () => {
    render(
      <BrowserRouter>
        <ProductItem product={mockProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
    expect(screen.getByText(/iPhone 16 Pro/i)).toBeInTheDocument();
  });

  it('displays product price', () => {
    render(
      <BrowserRouter>
        <ProductItem product={mockProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(/1300/)).toBeInTheDocument();
  });
});
