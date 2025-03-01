export type CreateOrderRequest = {
  pickupReservedAt: string;
  customerRequest: string;
};

export type OrderSuccessRequest = {
  paymentKey: string;
  ordersId: string;
  amount: number;
};
