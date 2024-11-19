import {ProductType} from './ProductType';

export type OrderType = {
  ordersId: number;
  marketId: number;
  marketName: string;
  createdAt: number;
  pickupReservedAt: number;
  ordersPrice: number;
  ordersStatus: 'ORDERED' | 'ACCEPTED' | 'PICKEDUP' | 'CANCELED';
  customerRequest: string;
  products: (ProductType & {count: number})[];
};
