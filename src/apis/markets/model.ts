import {MarketType} from '@/types/Market';

export type MarketPaginationLocRequest = {
  userLatitude?: number;
  userLongitude?: number;
};

export type MarketPaginationRequest = {
  cursorDistance: number;
  size: number;
} & MarketPaginationLocRequest;

export type MarketListResponse = {
  markets: (MarketType & {cursorDistance: number})[];
  hasNext: boolean;
};
