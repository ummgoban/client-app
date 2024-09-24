import {MarketType} from './Market';
import {ProductType} from './ProductType';

export type OrderType = CartType & {
  pickupAt: number;
  createdAt: number;
  pendingAt?: number;
  doneAt?: number;
  status: 'ORDERED' | 'PENDING' | 'DONE' | 'CANCEL';
};

export type CartType = {
  id: number;
  market: MarketType;
  products: (ProductType & {count: number})[];
};
