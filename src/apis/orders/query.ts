import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getOrderDetail,
  getOrderHistory,
  getProgressingOrder,
  requestOrder,
  requestOrderSuccess,
} from './client';
import {CreateOrderRequest, OrderSuccessRequest} from './model';

export const useOrderHistoryQuery = () => {
  return useQuery({
    queryKey: ['orderHistory'],
    queryFn: () => getOrderHistory(),
  });
};

export const useProgressingOrderQuery = () => {
  return useQuery({
    queryKey: ['progressingOrder'],
    queryFn: () => getProgressingOrder(),
  });
};

export const useRequestOrderMutation = () => {
  return useMutation({
    mutationKey: ['requestOrder'],
    mutationFn: ({pickupReservedAt, customerRequest}: CreateOrderRequest) =>
      requestOrder({pickupReservedAt, customerRequest}),
  });
};

export const useRequestOrderSuccessMutation = () => {
  return useMutation({
    mutationKey: ['requestOrderSuccess'],
    mutationFn: ({ordersId, paymentKey, amount}: OrderSuccessRequest) =>
      requestOrderSuccess({ordersId, paymentKey, amount}),
  });
};

export const useOrderDetailQuery = (orderId: string) => {
  return useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: () => getOrderDetail(orderId),
  });
};
