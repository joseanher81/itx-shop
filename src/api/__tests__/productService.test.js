import { describe, it, expect, vi } from 'vitest';
import { getProduct, getProducts, addToCart, api } from '../productService';

describe('getProduct', () => {
  it('returns the correct produc data', async () => {
    const mockResponse = { data: { id: '1', model: 'iPhone' } };
    vi.spyOn(api, 'get').mockResolvedValueOnce(mockResponse); // Mock api response

    const result = await getProduct('1');

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith('/product/1');
  });

  it('throws an error when request fails', async () => {
    vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network Error'));

    await expect(getProduct('1')).rejects.toThrow('Error fetching product');
  });
});

describe('getProducts', () => {
  it('returns the correct list of products', async () => {
    const mockResponse = {
      data: [
        { id: '1', model: 'iPhone' },
        { id: '2', model: 'Acer' },
        { id: '3', model: 'Samsung' },
      ],
    };
    vi.spyOn(api, 'get').mockResolvedValueOnce(mockResponse); // Mock api response

    const result = await getProducts();

    expect(result).toEqual(mockResponse.data);
    expect(api.get).toHaveBeenCalledWith('/product');
  });

  it('throws an error when request fails', async () => {
    vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('Network Error'));

    await expect(getProducts()).rejects.toThrow('Error fetching product list');
  });
});

describe('addToCart', () => {
  const productData = {
    id: 'ZmGrkLRPXOTpxsU4jjAcv',
    colorCode: 'black',
    storageCode: '64gb',
  };

  it('calls to the right endpoint with the expected body and returns the correct response', async () => {
    const mockResponse = { data: { count: 5 } };

    const postSpy = vi.spyOn(api, 'post').mockResolvedValueOnce(mockResponse);

    const result = await addToCart(productData);

    expect(postSpy).toHaveBeenCalledWith('/cart', productData); // Correct endpoint with body
    expect(result).toEqual(mockResponse.data); //Response data
  });

  it('throws an error when request fails', async () => {
    vi.spyOn(api, 'post').mockRejectedValueOnce(new Error('Network Error'));

    await expect(addToCart(productData)).rejects.toThrow('Error adding product to cart');
  });
});
