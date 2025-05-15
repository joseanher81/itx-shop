import { describe, it, expect } from 'vitest';
import { cartReducer } from '../CartContext';

describe('cartReducer', () => {
  const initialState = { count: 0, cart: [] };

  it('Updates the count correctly', () => {
    const action = { type: 'SET_COUNT', payload: 5 };
    const state = cartReducer(initialState, action);
    expect(state.count).toBe(5);
  });

  it('Adds a product to cart', () => {
    const action = { type: 'ADD_TO_CART', payload: 'ZmGrkLRPXOTpxsU4jjAcv' };
    const state = cartReducer(initialState, action);
    expect(state.cart).toContain('ZmGrkLRPXOTpxsU4jjAcv');
  });
});
