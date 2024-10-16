import {MarketType} from '@/types/Market';

const dummyMarketDetail: MarketType = {
  id: 1,
  name: '반찬가게1',
  pickupStartAt: 1609718400000,
  pickupEndAt: 1727622000000,
  products: [
    {
      id: 1,
      name: '김치',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 10000,
      discountPrice: 7000,
      tags: ['추천메뉴', '김치류'],
    },
    {
      id: 2,
      name: '깻잎',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 5000,
      discountPrice: 3000,
      tags: ['깻잎류'],
    },
    {
      id: 3,
      name: '간장게장',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 20000,
      discountPrice: 17000,
      tags: ['추천메뉴', '게장류'],
    },
    {
      id: 4,
      name: '양념게장',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 20000,
      discountPrice: 17000,
      tags: ['게장류'],
    },
    {
      id: 5,
      name: '물김치',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 20000,
      discountPrice: 17000,
      tags: ['김치류'],
    },
    {
      id: 6,
      name: '된장국',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 20000,
      discountPrice: 17000,
      tags: ['국류'],
    },
  ],
  address: '서울특별시 동대문구 휘경동',
  images: ['https://legacy.reactjs.org/logo-og.png'],
};

// TODO: fetch market detail data
export const getMarketDetail = async (
  marketId: number,
): Promise<MarketType | null> => {
  try {
    console.log(marketId);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(dummyMarketDetail);
        console.log('fetch market detail');
      }, 500);
    });
  } catch (error) {
    console.error('Error fetching market detail:', error);
    return null;
  }
};
