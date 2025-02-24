import {MarketType} from './Market';
import {ProductType} from './ProductType';

//TODO: type explict define
export type BucketType = {
  market: Pick<MarketType, 'id' | 'name' | 'images'>;
  products: ({count: number} & ProductType)[];
};

export type BucketProductType = Omit<
  ProductType,
  'tags' | 'productStatus' | 'stock'
> & {
  count: number;
};
