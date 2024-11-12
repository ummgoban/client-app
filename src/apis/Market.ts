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
    } | null>(`/markets`, {
      params: {
        cursorId,
        size,
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching market list:', error);
    return null;
  }
};

export const getMarket = async (
  marketId: number,
): Promise<MarketType | null> => {
  try {
    const res = await apiClient.get<MarketType | null>(`/markets/${marketId}`);

    return res;
  } catch (error) {
    console.error(`Error fetching market: ${marketId}`, error);
    return null;
  }
};

export const updateMarketLike = async (marketId: number): Promise<boolean> => {
  try {
    const res = await apiClient.post(`/markets/${marketId}/likes`);
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error in updateMarketLike:', error);
    return false;
  }
};
