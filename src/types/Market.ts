import {ProductType} from './ProductType';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: number;
  pickupEndAt: number;
  address: string;
  products: ProductType[];
  images: string[];
  openAt: string;
  closeAt: string;
  specificAddress: string;
};
