import {ProductType} from '@ummgoban/shared/lib';

export type MarketType = {
  id: number;
  name: string;
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
  summary: string;
  reviewNum: number;
  averageRating: number | null;
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
