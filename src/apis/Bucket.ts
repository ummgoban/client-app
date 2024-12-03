import {BucketType, BucketProductType} from '@/types/Bucket';
import apiClient from './ApiClient';

export const getBuckets = async (): Promise<BucketType | null> => {
  try {
    const res = await apiClient.get<BucketType | null>('/buckets');

    return res;
  } catch (error) {
    console.error('Error fetching getBurkets list:', error);
    return null;
  }
};

export const validateBucket = async (marketId: number): Promise<boolean> => {
  try {
    const res = await apiClient.get<{
      sameMarketProduct: boolean;
    }>(`/buckets/markets/${marketId}`);
    if (res?.sameMarketProduct) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error fetching validateBucket:', error);
    return false;
  }
};

export const addToBucket = async (
  marketId: number,
  products: BucketProductType[],
): Promise<boolean> => {
  try {
    const res = await apiClient.post<{
      code: number;
      message: string;
      data: string;
    }>(`/buckets/markets/${marketId}`, {products});
    console.log('products: ', products);
    if (res && res.code === 200 && res.data === '상품 추가 성공') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('addToBucket error:', error);
    return false;
  }
};

export const updateBucketProduct = async (
  productId: number,
  count: number,
): Promise<boolean> => {
  try {
    const res = await apiClient.patch<{
      code: number;
      message: string;
      data: string;
    }>(
      `/buckets`,
      {},
      {
        params: {
          productId,
          count,
        },
      },
    );
    if (res && res.code === 200 && (res.data === 'SUCCESS' || 'CREATE')) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('updateBucket error:', error);
    return false;
  }
};

export const deleteBucketProduct = async (
  productId: number,
): Promise<boolean> => {
  try {
    const res = await apiClient.del<{
      code: number;
      message: string;
      data: string;
    }>(`/buckets`, {
      params: {
        productId,
      },
    });
    if (res && res.code === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('updateBucket error:', error);
    return false;
  }
};
