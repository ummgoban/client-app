import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {getMarketList, getMarket, updateMarketLike} from './client';
import {MarketListRequest} from './model';

export const useMarketList = ({
  cursorId,
  size,
  userLatitude,
  userLongitude,
}: MarketListRequest) => {
  return useInfiniteQuery({
    queryKey: ['marketList', cursorId, size, userLatitude, userLongitude],
    queryFn: ({pageParam}) =>
      getMarketList({cursorId: pageParam, size, userLatitude, userLongitude}),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage?.hasNext ? lastPage.markets.length : undefined;
    },
  });
};

export const useMarket = (marketId: number | undefined) => {
  return useQuery({
    queryKey: ['market', marketId],
    queryFn: () => {
      if (!marketId) return null;
      return getMarket(marketId);
    },
  });
};

export const useMarketLike = (marketId: number) => {
  return useMutation({
    mutationKey: ['marketLike', marketId],
    mutationFn: () => updateMarketLike(marketId),
  });
};
