import {MarketType} from '@/types/Market';
import {get} from './methods';

// TODO: fetch store lists
export const getMarketList = async (
  cursorId: number = 0,
  size: number = 10,
): Promise<{
  markets: MarketType[];
  hasNext: boolean;
} | null> => {
  try {
    const res = await get<{
      markets: MarketType[];
      hasNext: boolean;
    } | null>(`/market/paging?cursorId=${cursorId}&size=${size}`);

    return res;
  } catch (error) {
    console.error('Error fetching market list:', error);
    return null;
  }
};
