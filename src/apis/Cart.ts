import {CartType} from '@/types/OrderType';

const dummyCartList: CartType[] = [
  {
    id: 1,
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
        originalPrice: 10000,
        discountPrice: 7000,
        count: 3,
      },
      {
        id: 2,
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 5000,
        discountPrice: 3000,
        count: 3,
      },
      {
        id: 3,
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 20000,
        discountPrice: 17000,
        count: 3,
      },
    ],
  },
];

export const getCartHistory = async (): Promise<CartType[] | null> => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyCartList);
        console.log('fetch getCartHistory lists');
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching getCartHistory list:', error);
    return null;
  }
};
