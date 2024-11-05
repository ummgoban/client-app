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
    } | null>(`/market/paging?cursorId=${cursorId}&size=${size}`);

    return res;
  } catch (error) {
    console.error('Error fetching market list:', error);
    return null;
  }
};

export const updateMarketLike = async (
  marketId: string,
  marketIsLiked: boolean,
) => {
  try {
    const res = marketIsLiked
      ? await apiClient.del(`/market/${marketId}/like`)
      : await apiClient.post(`/market/${marketId}/like`);

    if (res.status === 200 || res.status === 201) {
      return res;
    }
    return null;
  } catch (error) {
    console.error('Error in updateMarketLike:', error);
    return null;
  }
};
