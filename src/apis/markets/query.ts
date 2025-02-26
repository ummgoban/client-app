import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {getMarketList, getMarket, updateMarketLike} from './client';
import {MarketListQueryRequest} from './model';

export const useMarketList = ({
  userLatitude,
  userLongitude,
}: MarketListQueryRequest) => {
  return useInfiniteQuery({
    queryKey: ['marketList', userLatitude, userLongitude],
    queryFn: ({pageParam = 0}) =>
      getMarketList({
        cursorId: pageParam,
        size: 5,
        userLatitude,
        userLongitude,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.hasNext
        ? lastPage.markets[lastPage.markets.length - 1].id
        : undefined,
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
