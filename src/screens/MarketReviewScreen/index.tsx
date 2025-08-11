import React, {useCallback} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {
  DetailStackParamList,
  RootStackParamList,
} from '@/types/StackNavigationType';
import {useReadReviewListForMarket} from '@/apis/review';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import S from './MarketReviewScreen.style';
import MarketReviewCard from '@/components/marketReview/MarketReviewCard';
import {ActivityIndicator} from 'react-native-paper';
import EmptyComponent from '@/components/common/EmptyComponent';
import {useNavigation} from '@react-navigation/native';
import {routeToDetail} from '@/navigation/navigator';

type MarketReviewScreenProps = StackScreenProps<
  DetailStackParamList,
  'MarketReview'
>;
const MarketReviewScreen = ({route}: MarketReviewScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
        <ActivityIndicator size="small" animating={true} />
      </View>
    );
  }

  if (reviews.length === 0) {
    return (
      <EmptyComponent
        title="리뷰 내역이 없어요. 주문 후 리뷰를 남겨보세요."
        onPress={() => routeToDetail(navigation, route.params.marketId)}
        buttonText="주문하러 가기"
      />
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
