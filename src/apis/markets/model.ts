export type MarketListQueryRequest = {
  userLatitude?: number;
  userLongitude?: number;
};

export type MarketListRequest = {
  cursorId: number;
  size: number;
} & MarketListQueryRequest;
