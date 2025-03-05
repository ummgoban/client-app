import {OrderDetailType, OrderType} from '@/types/OrderType';

import {CreateOrderRequest, OrderSuccessRequest} from './model';

import apiClient from '../ApiClient';
import CustomError from '../CustomError';

const BASE_URL = '/customer/orders';

export const getOrderHistory = async (): Promise<OrderType[]> => {
  try {
    const res = await apiClient.get<OrderType[]>(`${BASE_URL}`);
    return res ?? [];
  } catch (error) {
    throw new CustomError(error);
  }
};

export const getProgressingOrder = async (): Promise<OrderType[]> => {
  try {
    const res = await apiClient.get<OrderType[]>(`${BASE_URL}/progress`);
    return res ?? [];
  } catch (error) {
    throw new CustomError(error);
  }
};

export const requestOrder = async ({
  pickupReservedAt,
  customerRequest,
}: CreateOrderRequest): Promise<{
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
    } | null>(`${BASE_URL}`, {
      pickupReservedAt,
      customerRequest,
    });

    return res?.data ?? null;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const requestOrderSuccess = async ({
  paymentKey,
  ordersId,
  amount,
}: OrderSuccessRequest): Promise<Boolean | null> => {
  try {
    const res = await apiClient.post<{code: number} | null>(
      `${BASE_URL}/payments`,
      {
        paymentKey,
        ordersId,
        amount,
      },
    );

    return res?.code === 201;
  } catch (error) {
    throw new CustomError(error);
  }
};

export const getOrderDetail = async (
  ordersId: string,
): Promise<OrderDetailType | null> => {
  try {
    const res = await apiClient.get<OrderDetailType | null>(
      `${BASE_URL}/${ordersId}`,
    );
    return res;
  } catch (error) {
    throw new CustomError(error);
  }
};
