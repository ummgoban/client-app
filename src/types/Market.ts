import {ProductType} from '@ummgoban/shared/lib';

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

export type MarketDetailType = Omit<MarketType, 'openAt' | 'closeAt'> & {
  hasLike: boolean;
  imageUrls: string[];
  summary: string;
  reviewNum: number;
  likeNum: number;
  averageRating: number | null;
  marketOpenHours: MarketOpenHourType[];
};

export type MarketOpenHourType = {
  dayOfWeek:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';
  openTime: string;
  closeTime: string;
};
