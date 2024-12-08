import {ProductType} from './ProductType';

export type OrderType = {
  ordersId: string;
  marketId: number;
  marketName: string;
  createdAt: string;
  pickupReservedAt: string;
  ordersPrice: number;
  ordersStatus: 'ORDERED' | 'ACCEPTED' | 'PICKEDUP' | 'CANCELED' | 'NO_SHOW';
  customerRequest: string;
  products: (ProductType & {count: number})[];
};

export type OrderDetailType = OrderType & {
  orderMemberName: string;
  method: string;
  totalAmount: number;
  paymentKey: string;
  approvedAt: string;
  doneAt: string;
  address: string;
};
