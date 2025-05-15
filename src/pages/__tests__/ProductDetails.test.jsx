import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '../ProductDetails'; // Ajusta el path según sea necesario
import { useCache } from '../../hooks/useCache';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';

// Mocking the hook
vi.mock('../../hooks/useCache', () => ({
  useCache: vi.fn(),
}));

describe('ProductDetails', () => {
  it('renderiza los detalles del producto correctamente', async () => {
    const mockProduct = {
      id: '1',
      brand: 'Apple',
      model: 'iPhone 16',
      price: '1200',
      options: {
        storages: [{ code: '64gb', name: '64 GB' }],
        colors: [{ code: 'black', name: 'Black' }],
      },
    };

    useCache.mockReturnValue({ data: mockProduct, loading: false, error: null });

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <CartProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );

    // Verificar que los datos del producto se muestran
    expect(screen.getByText('Apple iPhone 16')).toBeInTheDocument();
    expect(screen.getByText('1200 €')).toBeInTheDocument();
    expect(screen.getByText('64 GB')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
  });
});
