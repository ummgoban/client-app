import {BucketType, BucketProductType} from '@/types/Bucket';
import apiClient from './ApiClient';
const dummyCartList: BucketType = {
  market: {
    id: 1,
    name: '가게이름이너무나길면두줄이찍히는데설마',
    images: ['https://legacy.reactjs.org/logo-og.png'],
  },
  products: [
    {
      id: 1,
      name: '김치',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originPrice: 10000,
      discountPrice: 7000,
      count: 3,
      tags: [
        {
          id: 1,
          tagName: '예시',
        },
      ],
    },
    {
      id: 2,
      name: '깻잎',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originPrice: 5000,
      discountPrice: 3000,
      count: 3,
      tags: [
        {
          id: 1,
          tagName: '예시',
        },
      ],
    },
    {
      id: 3,
      name: '간장게장',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originPrice: 20000,
      discountPrice: 17000,
      count: 3,
      tags: [
        {
          id: 1,
          tagName: '예시',
        },
      ],
    },
  ],
};

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

    if (!res) {
      return false;
    }

    return res.sameMarketProduct;
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

    if (res && res.code === 200 && res.message === '상품 추가 성공') {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error add to bucket', error);
    return false;
  }
};
