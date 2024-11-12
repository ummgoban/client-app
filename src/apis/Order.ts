import axios from 'axios';
import {CartType, OrderType} from '../types/OrderType';
import {PaymentInfo} from '@tosspayments/widget-sdk-react-native/lib/typescript/src/models/PaymentInfo';
import apiClient from './ApiClient';
import {Success} from '@tosspayments/widget-sdk-react-native';

const dummyCart: CartType = {
  id: 1,
  market: {
    id: 1,
    name: 'market1',
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
      tags: [
        {
          id: 1,
          tagName: '추천메뉴',
        },
        {id: 5, tagName: '김치류'},
      ],
    },
    {
      id: 2,
      name: '깻잎',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 5000,
      discountPrice: 3000,
      count: 3,
      tags: [
        {
          id: 2,
          tagName: '깻잎류',
        },
      ],
    },
    {
      id: 3,
      name: '간장게장',
      image: 'https://legacy.reactjs.org/logo-og.png',
      originalPrice: 20000,
      discountPrice: 17000,
      count: 3,
      tags: [
        {
          id: 3,
          tagName: '게장류',
        },
      ],
    },
  ],
};

const dummyHistoryList: OrderType[] = [
  {
    id: 1,
    market: {
      id: 1,
      name: 'very long market name very long market name',
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
        tags: [
          {
            id: 1,
            tagName: '추천메뉴',
          },
          {id: 5, tagName: '김치류'},
        ],
      },
      {
        id: 2,
        name: '깻잎',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 5000,
        discountPrice: 3000,
        count: 3,
        tags: [
          {
            id: 2,
            tagName: '깻잎류',
          },
        ],
      },
      {
        id: 3,
        name: '간장게장',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 20000,
        discountPrice: 17000,
        count: 3,
        tags: [
          {
            id: 3,
            tagName: '게장류',
          },
        ],
      },
    ],
    pickupAt: 1719545600000,
    createdAt: 1709545600000,
    status: 'ORDERED',
  },
  {
    id: 2,
    market: {
      id: 2,
      name: 'market2',
      images: ['https://legacy.reactjs.org/logo-og.png'],
    },
    products: [
      {
        id: 2,
        name: '띄어쓰기가없는엄청나게긴음식이름은어떻게해야될까요없는엄청나게긴음식이름은어떻게해야될까요',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 20000,
        discountPrice: 17000,
        count: 3,
        tags: [{id: 1, tagName: '추천메뉴'}],
      },
    ],
    pickupAt: 1614639000000,
    createdAt: 1610639000000,
    pendingAt: 1612639000000,
    status: 'PENDING',
  },
  {
    id: 3,
    market: {
      id: 3,
      name: 'market3',
      images: ['https://legacy.reactjs.org/logo-og.png'],
    },
    products: [
      {
        id: 3,
        name: 'very long product name + very long product name, very long product name, very long product name',
        image: 'https://legacy.reactjs.org/logo-og.png',
        originalPrice: 20000,
        discountPrice: 17000,
        count: 1,
        tags: [{id: 1, tagName: '추천메뉴'}],
      },
    ],
    pickupAt: 1610718400000,
    createdAt: 1609718400000,
    pendingAt: 1609718400000,
    doneAt: 1611718400000,
    status: 'DONE',
  },
];

const randomString = (): string => Math.random().toString(36).substr(2, 16);

const dummyPaymentInfo: PaymentInfo = {
  orderId: randomString(),
  orderName: '김치',
};

// TODO: fetch order history
export const getOrderHistory = async (): Promise<OrderType[] | null> => {
  try {
    // TODO: uri 수정
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

    if (!res) {
      return null;
    }

    return new Promise(async resolve => {
      await new Promise(_ => setTimeout(_, 1000));
      console.log('fetch order history');
      resolve(dummyHistoryList);
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

// TODO: fetch cart
export const getCart = async (): Promise<CartType | null> => {
  try {
    return new Promise(async resolve => {
      await new Promise(_ => setTimeout(_, 1000));
      console.log('fetch cart');
      resolve(dummyCart);
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const requestOrder = async (
  cart: CartType,
): Promise<PaymentInfo | null> => {
  try {
    // TODO: uri 수정
    // const res = await apiClient.post<PaymentInfo | null>('/order', cart);
    console.debug(cart);
    const res = dummyPaymentInfo;

    return res;
  } catch (error) {
    console.debug(error);
    return null;
  }
};

export const requestOrderSuccess = async (
  success: Success,
): Promise<Boolean | null> => {
  try {
    // TODO: uri 수정
    // const res = await apiClient.post<Boolean>('/order/success', success);
    console.debug(success);
    const res = true;
    return res;
  } catch (error) {
    console.debug(error);
    return null;
  }
};
