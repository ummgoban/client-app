import {ProductType} from '@ummgoban/shared';

export type SubscribeType = {
  id: number;
  name: string;
  address: string;
  specificAddress: string;
  openAt: string;
  closeAt: string;
  products: ProductType[];
};
