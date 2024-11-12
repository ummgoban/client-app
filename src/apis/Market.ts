import {MarketType} from '@/types/Market';
import apiClient from './ApiClient';

export const getMarketList = async (
  cursorId: number = 0,
  size: number = 10,
): Promise<{
  markets: MarketType[];
  hasNext: boolean;
} | null> => {
  try {
    const res = await apiClient.get<{
      markets: MarketType[];
      hasNext: boolean;
    } | null>(`/markets?cursorId=${cursorId}&size=${size}`);

    return res;
  } catch (error) {
    console.error('Error fetching market list:', error);
    return null;
  }
};
