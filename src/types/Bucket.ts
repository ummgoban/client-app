import {MarketType} from './Market';
import {ProductType} from './ProductType';

export type BucketType = {
  market: Pick<MarketType, 'id' | 'name' | 'images'>;
  products: (ProductType & {count: number})[];
};
