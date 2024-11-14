import {BucketType} from '@/types/Bucket';
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

    // TODO: API 호출
    return res?.products ? res : dummyCartList;
  } catch (error) {
    console.error('Error fetching getBurkets list:', error);
    return null;
  }
};
