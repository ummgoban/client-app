import {CartType} from '@/types/OrderType';

const dummyCartList: CartType[] = [
  {
    id: 1,
    market: {
      id: 1,
      name: '채찍으로따낸김상익형님의사과집',
      images: ['https://legacy.reactjs.org/logo-og.png'],
    },
    products: [
      {
        id: 1,
        name: '충주꿀사과',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 10000,
        discountPrice: 7000,
        count: 3,
      },
      {
        id: 2,
        name: '대충키우는자두',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 5000,
        discountPrice: 3000,
        count: 3,
      },
      {
        id: 3,
        name: '걍 맛있는 복숭아',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 20000,
        discountPrice: 17000,
        count: 3,
      },
      {
        id: 4,
        name: '3그루 있는 배',
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
