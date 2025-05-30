import React, {useCallback} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '@/types/StackNavigationType';
import {useReadReviewListForCustomer} from '@/apis/review';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import S from './CustomerReviewScreen.style';
import {CustomerReviewCard} from '@/components/common/customerReview';
import {ActivityIndicator} from 'react-native-paper';
import EmptyComponent from '@/components/common/EmptyComponent';

type CustomerReviewScreenProps = StackScreenProps<
  MyPageStackParamList,
  'CustomerReview'
>;

const CustomerReviewScreen = ({
  navigation,
  route,
}: CustomerReviewScreenProps) => {
  const {
    data: reviewList,
    refetch,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useReadReviewListForCustomer(route.params.memberId);

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

  const navigateMarketDetail = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'MarketDetail',
      params: {
        marketId: marketId,
      },
    });
  };

  if (reviews.length === 0) {
    return (
      <EmptyComponent
        title="리뷰 내역이 없어요. 주문 후 리뷰를 남겨보세요."
        onPress={() => navigation.navigate('Home', {screen: 'Feed'})}
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
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({item}) => {
          return (
            <CustomerReviewCard review={item} onPress={navigateMarketDetail} />
          );
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

export default CustomerReviewScreen;
