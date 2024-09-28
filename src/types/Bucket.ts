import {MarketType} from './Market';

export type BucketType = {
  market: Pick<MarketType, 'id' | 'name' | 'images'>;
  products: {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    discountPrice: number;
    count: number;
    // TODO: tags 장바구니-가게 화면간 타입 논의 필요
    tags: string[];
  }[];
};
