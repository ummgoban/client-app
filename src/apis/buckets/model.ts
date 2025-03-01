import {BucketProductType} from '@/types/Bucket';

export type AddBucketRequest = {
  marketId: number;
  products: BucketProductType[];
};

export type UpdateBucketRequest = {
  productId: number;
  count: number;
};
