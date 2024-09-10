import axios from 'axios';
import {StoreType} from '@/types/StoreType';

const dummyStoreList: StoreType[] = [
  {
    id: 1,
    name: '반찬가게1',
    pickupStartAt: 1609718400000,
    pickupEndAt: 1609728400000,
    products: [
      {
        id: 1,
        name: '김치',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
      {
        id: 2,
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: 3,
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '20000',
        discountPrice: '17000',
      },
    ],
  },
  {
    id: 2,
    name: '반찬가게2',
    pickupStartAt: 1609718400000,
    pickupEndAt: 1609728400000,
    products: [
      {
        id: 4,
        name: '겉절이',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '80000',
        discountPrice: '6000',
      },
      {
        id: 2,
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: 5,
        name: '된장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
    ],
  },
  {
    id: 3,
    name: '반찬가게3',
    pickupStartAt: 1609718400000,
    pickupEndAt: 1609728400000,
    products: [
      {
        id: 1,
        name: '김치',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
      {
        id: 2,
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: 3,
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '20000',
        discountPrice: '17000',
      },
    ],
  },
  {
    id: 4,
    name: '반찬가게4',
    pickupStartAt: 1609718400000,
    pickupEndAt: 1609728400000,
    products: [
      {
        id: 1,
        name: '김치',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '10000',
        discountPrice: '7000',
      },
      {
        id: 2,
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '5000',
        discountPrice: '3000',
      },
      {
        id: 3,
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: '20000',
        discountPrice: '17000',
      },
    ],
  },
];

// TODO: fetch store lists
export const getStoreList = async (): Promise<StoreType[] | null> => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyStoreList);
        console.log('fetch store lists');
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching store list:', error);
    return null;
  }
};
