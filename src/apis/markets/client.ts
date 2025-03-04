import {MarketDetailType} from '@/types/Market';

import apiClient from '../ApiClient';

import {MarketPaginationRequest, MarketListResponse} from './model';

export const getMarketList = async ({
  cursorDistance,
  size,
  userLatitude,
  userLongitude,
}: MarketPaginationRequest): Promise<MarketListResponse> => {
  try {
    const res = await apiClient.get<MarketListResponse>(`customer/markets`, {
      params: {
        cursorDistance,
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
  cursorDistance,
  size,
  userLatitude,
  userLongitude,
}: MarketPaginationRequest): Promise<MarketListResponse> => {
  try {
    const res = await apiClient.get<MarketListResponse>(
      `/customer/markets/likes`,
      {
        params: {
          cursorDistance,
          size,
          userLatitude,
          userLongitude,
        },
      },
    );

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
