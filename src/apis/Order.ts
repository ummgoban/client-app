import {OrderType} from '@/types/OrderType';
import apiClient from './ApiClient';

export const getOrderHistory = async (): Promise<OrderType[] | null> => {
  try {
    const res = await apiClient.get<OrderType[] | null>('/members/orders');
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProgressingOrder = async (): Promise<OrderType[] | null> => {
  try {
    const res = await apiClient.get<OrderType[] | null>(
      '/members/orders/progress',
    );
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const requestOrder = async (
  pickupReservedAt: string,
  customerRequest: string,
): Promise<{
  ordersId: string;
  ordersName: string;
  amount: number;
} | null> => {
  try {
    const res = await apiClient.post<{
      data: {
        ordersId: string;
        ordersName: string;
        amount: number;
      };
    } | null>('/orders', {
      pickupReservedAt,
      customerRequest,
    });

    return res?.data ?? null;
  } catch (error) {
    console.debug(error);
    return null;
  }
};

export const requestOrderSuccess = async (
  paymentKey: string,
  ordersId: string,
  amount: number,
): Promise<Boolean | null> => {
  try {
    const res = await apiClient.post<{code: number} | null>(
      '/orders/payments',
      {
        paymentKey,
        ordersId,
        amount,
      },
    );

    return res?.code === 201;
  } catch (error) {
    console.debug(error);
    return null;
  }
};
