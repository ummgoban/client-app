import {ProductType} from '@ummgoban/shared/lib';

export type MarketType = {
  id: number;
  name: string;
  address: string;
  specificAddress: string;
  products: ProductType[];
  latitude: number;
  longitude: number;
  openAt: string;
  closeAt: string;
  summary: string;
  likeNum: number;
  reviewNum: number;
  averageRating: number;
  images: string[];
  cursorDistance: number;
};

export type MarketDetailType = MarketType & {
  hasLike: boolean;
  marketOpenHour: MarketOpenHourType[];
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
