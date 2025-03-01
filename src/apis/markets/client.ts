import {MarketType, MarketDetailType} from '@/types/Market';
import {SubscribeType} from '@/types/Subscribe';

import apiClient from '../ApiClient';

import {MarketListRequest} from './model';

export const getMarketList = async ({
  cursorId,
  size,
  userLatitude,
  userLongitude,
}: MarketListRequest): Promise<{
  markets: MarketType[];
  hasNext: boolean;
}> => {
  try {
    const res = await apiClient.get<{
      markets: MarketType[];
      hasNext: boolean;
    }>(`customer/markets`, {
      params: {
        cursorId,
        size,
        userLatitude,
        userLongitude,
      },
    });

    if (!res) {
      return {
        markets: [],
        hasNext: false,
      };
    }

    return res;
  } catch (error) {
    console.error('Error fetching market list:', error);
    return {
      markets: [],
      hasNext: false,
    };
  }
};

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

export const getSubscribeList = async ({
  cursorId,
  size,
}: {
  cursorId: number;
  size: number;
}): Promise<{
  markets: SubscribeType[];
  hasNext: boolean;
}> => {
  try {
    const res = await apiClient.get<{
      markets: SubscribeType[];
      hasNext: boolean;
    }>(`/customer/markets/likes`, {
      params: {cursorId, size},
    });

    if (!res) {
      return {
        markets: [],
        hasNext: false,
      };
    }

    return res;
  } catch (error) {
    console.error('Error Subscribed market list:', error);
    return {
      markets: [],
      hasNext: false,
    };
  }
};
