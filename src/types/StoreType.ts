import {ProductType} from './ProductType';

export type StoreType = {
  id: number;
  name: string;
  pickupStartAt: number;
  pickupEndAt: number;
  products: ProductType[];
};
