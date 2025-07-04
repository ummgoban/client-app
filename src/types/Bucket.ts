import {MarketType} from './Market';
import {ProductType} from '@ummgoban/shared/lib';

//TODO: type explict define
export type BucketType = {
  market: Pick<MarketType, 'id' | 'name' | 'images' | 'closeAt' | 'openAt'>;
  products: ({count: number} & ProductType)[];
};

export type BucketProductType = Omit<
  ProductType,
  'tags' | 'productStatus' | 'stock'
> & {
  count: number;
};
