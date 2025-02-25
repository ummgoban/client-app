import {MarketType, MarketDetailType} from '@/types/Market';
import apiClient from './ApiClient';

export const getMarketList = async (
  cursorId: number = 0,
  size: number = 10,
  userLatitude?: number,
  userLongitude?: number,
): Promise<{
  markets: MarketType[];
  hasNext: boolean;
} | null> => {
  try {
    const res = await apiClient.get<{
      markets: MarketType[];
      hasNext: boolean;
    } | null>(`customer/markets`, {
      params: {
        cursorId,
        size,
        userLatitude,
        userLongitude,
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching market list:', error);
    return null;
  }
};

/**
 * @deprecated use [/apis/markets/query.ts](./markets/query.ts) instead
 */
export const getMarket = async (
  marketId: number,
): Promise<MarketDetailType | null> => {
  try {
    const res = await apiClient.get<MarketDetailType | null>(
      `/customer/markets/${marketId}`,
    );

    return res;
  } catch (error) {
    console.error(`Error fetching market: ${marketId}`, error);
    return null;
  }
};

export const updateMarketLike = async (marketId: number): Promise<boolean> => {
  try {
    const res = await apiClient.post(`customer/markets/${marketId}/likes`);
    if (res) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error in updateMarketLike:', error);
    return false;
  }
};
