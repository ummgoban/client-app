import React, {useCallback} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {useReadReviewListForMarket} from '@/apis/review';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import CustomActivityIndicator from '@/components/common/ActivityIndicator';
import S from './MarketReviewScreen.style';
import MarketReviewCard from '@/components/marketReview/MarketReviewCard';
import {ActivityIndicator} from 'react-native-paper';
type MarketReviewScreenProps = StackScreenProps<
  DetailStackParamList,
  'MarketReview'
>;
const MarketReviewScreen = ({route}: MarketReviewScreenProps) => {
  const {
    data: reviewList,
    refetch,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useReadReviewListForMarket(route.params.marketId);
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const {refreshing, onRefresh} = usePullDownRefresh(async () => {
    await refetch();
  });
  const reviews = reviewList?.pages
    ? reviewList.pages.flatMap(page => page.reviews)
    : [];

  if (isLoading) {
    return (
      <View>
        <CustomActivityIndicator />
      </View>
    );
  }

  return (
    <S.Container>
      <FlatList
        data={reviews}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => `${item.id}-${index}-${item.name}`}
        renderItem={({item}) => {
          return <MarketReviewCard review={item} />;
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <S.LastIndicatorItem>
              <ActivityIndicator size="small" animating={true} />
            </S.LastIndicatorItem>
          ) : null
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.6}
      />
    </S.Container>
  );
};

export default MarketReviewScreen;
