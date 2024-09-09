// TODO: declare store type
// TODO: declare product type

export type OrderType = {
  id: number;
  store: {
    id: number;
    name: string;
    image: string;
  };
  product: {
    id: number;
    name: string;
    price: number;
    count: number;
  }[];
  pickupAt: number;
  createdAt: number;
  pendingAt?: number;
  doneAt?: number;
  status: 'ORDERED' | 'PENDING' | 'DONE' | 'CANCEL';
};
