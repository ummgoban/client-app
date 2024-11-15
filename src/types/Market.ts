import {ProductType} from './ProductType';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: string;
  pickupEndAt: string;
  address: string;
  products: ProductType[];
  specificAddress: string;
  openAt: string;
  closeAt: string;
  images: string[];
};

export type MarketDetailType = MarketType & {
  hasLike: boolean;
  imageUrls: string[];
  summary: string;
};
