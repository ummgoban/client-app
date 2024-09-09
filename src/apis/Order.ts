import axios from 'axios';
import {OrderType} from '../types/OrderType';

const dummyHistoryList: OrderType[] = [
  {
    id: 1,
    store: {
      id: 1,
      name: 'very long store name very long store name',
      image: 'https://legacy.reactjs.org/logo-og.png',
    },
    product: [
      {
        id: 1,
        name: 'product1',
        price: 1000,
        count: 3,
      },
      {
        id: 2,
        name: 'product2',
        price: 2000,
        count: 1,
      },
    ],
    pickupAt: 1719545600000,
    createdAt: 1709545600000,
    status: 'ORDERED',
  },
  {
    id: 2,
    store: {
      id: 2,
      name: 'store2',
      image: 'https://legacy.reactjs.org/logo-og.png',
    },
    product: [
      {
        id: 2,
        name: '띄어쓰기가없는엄청나게긴음식이름은어떻게해야될까요없는엄청나게긴음식이름은어떻게해야될까요',
        price: 2000,
        count: 1,
      },
    ],
    pickupAt: 1614639000000,
    createdAt: 1610639000000,
    pendingAt: 1612639000000,
    status: 'PENDING',
  },
  {
    id: 3,
    store: {
      id: 3,
      name: 'store3',
      image: 'https://legacy.reactjs.org/logo-og.png',
    },
    product: [
      {
        id: 3,
        name: 'very long product name + very long product name, very long product name, very long product name',
        price: 3000,
        count: 1,
      },
    ],
    pickupAt: 1610718400000,
    createdAt: 1609718400000,
    pendingAt: 1609718400000,
    doneAt: 1611718400000,
    status: 'DONE',
  },
];

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
