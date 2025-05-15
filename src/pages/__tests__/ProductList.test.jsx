import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductList from '../ProductList'; // Ajusta el path según sea necesario
import { useCache } from '../../hooks/useCache';
import { MemoryRouter } from 'react-router-dom';

// Mocking the hook
vi.mock('../../hooks/useCache', () => ({
  useCache: vi.fn(),
}));

describe('ProductList', () => {
  it('renders product list and filters correctly', async () => {
    const mockData = [
      { id: '1', brand: 'Apple', model: 'iPhone', price: '999' },
      { id: '2', brand: 'Samsung', model: 'Galaxy', price: '799' },
    ];
    useCache.mockReturnValue({ data: mockData, loading: false, error: null });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    // Verificar que los productos están renderizados
    expect(screen.getByText('Apple iPhone')).toBeInTheDocument();
    expect(screen.getByText('Samsung Galaxy')).toBeInTheDocument();

    // Simular búsqueda
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'iPhone' } });

    await waitFor(() => expect(screen.getByText('Apple iPhone')).toBeInTheDocument());
    expect(screen.queryByText('Samsung Galaxy')).toBeNull(); // El Samsung debe desaparecer
  });

  it('shows a loading indicator when loading', () => {
    useCache.mockReturnValue({ data: [], loading: true, error: null });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays an error when there is a problem loading products', () => {
    useCache.mockReturnValue({
      data: [],
      loading: false,
      error: { message: 'Error fetching data' },
    });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });
});
