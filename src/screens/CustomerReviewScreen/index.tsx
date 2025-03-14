import React, {useCallback} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {useReadReviewListForCustomer} from '@/apis/review';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import S from './CustomerReviewScreen.style';
import {CustomerReviewCard} from '@/components/common/customerReview';
import {ActivityIndicator} from 'react-native-paper';

type CustomerReviewScreenProps = StackScreenProps<
  DetailStackParamList,
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
