import {BucketType} from '@/types/Bucket';
import {Success} from '@tosspayments/widget-sdk-react-native';
import {PaymentInfo} from '@tosspayments/widget-sdk-react-native/lib/typescript/src/models/PaymentInfo';
import {OrderType} from '../types/OrderType';
import apiClient from './ApiClient';

const randomString = (): string => Math.random().toString(36).substr(2, 16);

const dummyPaymentInfo: PaymentInfo = {
  orderId: randomString(),
  orderName: '김치',
};

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
  cart: BucketType,
): Promise<PaymentInfo | null> => {
  try {
    // TODO: uri 수정
    // const res = await apiClient.post<PaymentInfo | null>('/order', cart);
    apiClient.get('/utils/health');
    console.debug(cart);
    const res = dummyPaymentInfo;

    return res;
  } catch (error) {
    console.debug(error);
    return null;
  }
};

export const requestOrderSuccess = async (
  success: Success,
): Promise<Boolean | null> => {
  try {
    // TODO: uri 수정
    // const res = await apiClient.post<Boolean>('/order/success', success);
    console.debug(success);
    const res = true;
    return res;
  } catch (error) {
    console.debug(error);
    return null;
  }
};
