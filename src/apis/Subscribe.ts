import {SubscribeType} from '@/types/Subscribe';
import apiClient from './ApiClient';

export const getSubscribeList = async (
  cursorId: number = 0,
  size: number = 10,
): Promise<{
  markets: SubscribeType[];
  hasNext: boolean;
} | null> => {
  try {
    const res = await apiClient.get<{
      markets: SubscribeType[];
      hasNext: boolean;
    } | null>(`/customer/markets/likes`, {
      params: {cursorId, size},
    });
    return res;
  } catch (error) {
    console.error('Error Subscribed market list:', error);
    return null;
  }
};
