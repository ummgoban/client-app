import {ProductType} from './ProductType';

export type StoreType = {
  id: string;
  name: string;
  pickupTime: string;
  products: ProductType[];
};
