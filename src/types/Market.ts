import {ProductType} from './ProductType';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: number;
  pickupEndAt: number;
  address: string;
  products: ProductType[];
  images: string[];
  hasLike: boolean;
  // TODO: 논의 필요
  marketId?: number;
};
