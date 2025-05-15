import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCache } from '../useCache';

const mockFetch = vi.fn();

beforeEach(() => {
  localStorage.clear();
  mockFetch.mockClear();
});

describe('useCache', () => {
  it('returns data after the fetch', async () => {
    const fakeData = { id: 1, name: 'Samsung' };
    mockFetch.mockResolvedValue(fakeData);

    const { result } = renderHook(() => useCache('testKey', mockFetch, 1000));

    expect(result.current.loading).toBe(true);

    await act(() => Promise.resolve()); //wait for the effect

    expect(result.current.data).toEqual(fakeData);
    expect(result.current.loading).toBe(false);
  });

  it('returns error if function fails', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useCache('failKey', mockFetch, 1000));

    await act(() => Promise.resolve());

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toBe(null);
  });
});
