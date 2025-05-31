import {ProductType} from '@ummgoban/shared/types';

export type SubscribeType = {
  id: number;
  name: string;
  address: string;
  specificAddress: string;
  openAt: string;
  closeAt: string;
  products: ProductType[];
};
