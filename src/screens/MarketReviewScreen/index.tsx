import React from 'react';
import {Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {useReadReviewListForMarket} from '@/apis/review';

type MarketReviewScreenProps = StackScreenProps<
  DetailStackParamList,
  'MarketReview'
>;
const MarketReviewScreen = ({route}: MarketReviewScreenProps) => {
  const {
    data: review,
    refetch,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useReadReviewListForMarket(route.params.marketId);
  return <Text>sdasdfsadfsdafaf</Text>;
};

export default MarketReviewScreen;
