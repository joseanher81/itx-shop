import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

describe('Search component', () => {
  it('renders input with intial value', () => {
    render(<Search query="acer" setQuery={() => {}} />);
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('acer');
  });

  it('calls set query when user changes input', () => {
    const mockSetQuery = vi.fn();

    render(<Search query="" setQuery={mockSetQuery} />);

    const input = screen.getByLabelText(/search/i);
    fireEvent.change(input, { target: { value: 'Samsung' } });

    expect(mockSetQuery).toHaveBeenCalledWith('Samsung');
  });
});
