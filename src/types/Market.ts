import {ProductType} from './ProductType';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: number;
  pickupEndAt: number;
  products: ProductType[];
  images: string[];
  address: string;
};
