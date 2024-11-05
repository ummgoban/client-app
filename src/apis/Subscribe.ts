import {SubscribeType} from '@/types/Subscribe';
// import apiClient from './ApiClient';

// export const getSubscribeList = async (
//   cursorId: number = 0,
//   size: number = 10,
// ): Promise<{
//   markets: SubscribeType[];
//   hasNext: boolean;
// } | null> => {
//   try {
//     const res = await apiClient.get<{
//       markets: SubscribeType[];
//       hasNext: boolean;
//     } | null>(`/market/paging?cursorId=${cursorId}&size=${size}`);
//     return res;
//   } catch (error) {
//     console.error('Error Subscribed market list:', error);
//     return null;
//   }
// };
const dummySubscribeList: SubscribeType[] = [
  {
    id: 1,
    name: '신선 마켓',
    address: '서울시 중구 메인로 123',
    specificAddress: 'A동 3층',
    openAt: '09:00',
    closeAt: '21:00',
    products: [
      {
        id: 101,
        name: '사과',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 3000,
        discountPrice: 2500,
        tags: ['과일', '신선', '유기농'],
      },
      {
        id: 102,
        name: '바나나',
        image: 'https://example.com/images/banana.jpg',
        originalPrice: 2000,
        discountPrice: 1500,
        tags: ['과일', '노란색', '수입'],
      },
    ],
  },
  {
    id: 2,
    name: '그린 식품점',
    address: '서울시 강남구 마켓로 456',
    specificAddress: '7번 가게',
    openAt: '08:00',
    closeAt: '20:00',
    products: [
      {
        id: 201,
        name: '당근',
        image: 'https://legacy.reactjs.org/logo-og.png',

        originalPrice: 1500,
        discountPrice: 1200,
        tags: ['채소', '유기농', '국내산'],
      },
      {
        id: 202,
        name: '감자',
        image: 'https://example.com/images/potato.jpg',
        originalPrice: 1000,
        discountPrice: 800,
        tags: ['채소', '주식', '국내산'],
      },
      {
        id: 203,
        name: '토마토',
        image: 'https://example.com/images/tomato.jpg',
        originalPrice: 2500,
        discountPrice: 2000,
        tags: ['과일', '신선', '유기농'],
      },
    ],
  },
];

export const getSubscribeList = async (): Promise<SubscribeType[] | null> => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dummySubscribeList);
        console.log('fetch');
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching Subscribe List:', error);
    return null;
  }
};
