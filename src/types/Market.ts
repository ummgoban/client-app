import {ProductType} from '@ummgoban/shared';

export type MarketType = {
  id: number;
  name: string;
  pickupStartAt: string;
  pickupEndAt: string;
  address: string;
  products: ProductType[];
  specificAddress: string;
  latitude: number;
  longitude: number;
  openAt: string;
  closeAt: string;
  images: string[];
};

export type MarketDetailType = MarketType & {
  hasLike: boolean;
  imageUrls: string[];
  summary: string;
  reviewNum: number;
  likeNum: number;
  averageRating: number | null;
};
