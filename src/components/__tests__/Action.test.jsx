import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Actions from '../Actions';

const mockProduct = {
  id: 'ZmGrkLRPXOTpxsU4jjAcv',
  price: 170,
  options: {
    storages: [
      { code: '64gb', name: '64 GB' },
      { code: '128gb', name: '128 GB' },
    ],
    colors: [
      { code: 'black', name: 'Black' },
      { code: 'white', name: 'White' },
    ],
  },
};

describe('Actions component', () => {
  it('render selects with product options', () => {
    render(
      <Actions
        product={mockProduct}
        handleAddToCart={() => {}}
        selectedColor="black"
        selectedStorage="64gb"
        handleChangeColor={() => {}}
        handleChangeStorage={() => {}}
        isPending={false}
      />
    );

    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/storage/i)).toBeInTheDocument();
    expect(screen.getByText(/Add to cart/i)).toBeInTheDocument();
  });

  it('calls handleChangeColor when selection another color', () => {
    const mockChange = vi.fn();
    render(
      <Actions
        product={mockProduct}
        handleAddToCart={() => {}}
        selectedColor="black"
        selectedStorage="64gb"
        handleChangeColor={mockChange}
        handleChangeStorage={() => {}}
        isPending={false}
      />
    );

    fireEvent.change(screen.getByLabelText(/color/i), { target: { value: 'white' } });
    expect(mockChange).toHaveBeenCalledWith('white');
  });

  it('dissable button when isPending equals true', () => {
    render(
      <Actions
        product={mockProduct}
        handleAddToCart={() => {}}
        selectedColor="black"
        selectedStorage="64gb"
        handleChangeColor={() => {}}
        handleChangeStorage={() => {}}
        isPending={true}
      />
    );

    expect(screen.getByRole('button', { name: /adding/i })).toBeDisabled();
  });

  it('calls handleAddToCart with selected values', () => {
    const mockAdd = vi.fn();
    render(
      <Actions
        product={mockProduct}
        handleAddToCart={mockAdd}
        selectedColor="black"
        selectedStorage="128gb"
        handleChangeColor={() => {}}
        handleChangeStorage={() => {}}
        isPending={false}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(mockAdd).toHaveBeenCalledWith({
      id: 'ZmGrkLRPXOTpxsU4jjAcv',
      colorCode: 'black',
      storageCode: '128gb',
    });
  });
});
