export type ProductType = {
  id: number;
  name: string;
  image: string;
  originPrice: number;
  discountPrice: number;
  tags: TagType[];
  productStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'HIDDEN';
  stock: number;
  count?: number;
};

export type TagType = {
  id: number;
  tagName: string;
};
