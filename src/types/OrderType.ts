import {MarketType} from './Market';
import {ProductType} from './ProductType';

export type OrderType = {
  id: number;
  market: Pick<MarketType, 'id' | 'images' | 'name'>;
  products: (ProductType & {count: number})[];
  pickupAt: number;
  createdAt: number;
  pendingAt?: number;
  doneAt?: number;
  status: 'ORDERED' | 'PENDING' | 'DONE' | 'CANCEL';
};
