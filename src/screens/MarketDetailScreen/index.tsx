import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Text} from 'react-native';

import {useMarket} from '@/apis/markets';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import {DetailStackParamList} from '@/types/StackNavigationType';

import MarketDetailPage from './MarketDetailPage';

type Props = StackScreenProps<DetailStackParamList, 'MarketDetail'>;

const screenOptions = (title: string): StackNavigationOptions => ({
  headerTitle: () => <HeaderTitle title={title} />,
});

const MarketDetailScreen = ({navigation, route}: Props) => {
  const {data: marketDetail} = useMarket(route.params.marketId);

  useEffect(() => {
    navigation.setOptions(screenOptions(marketDetail?.name ?? '가게 정보'));
  }, [marketDetail?.name, navigation]);

  if (!marketDetail) {
    return <Text>가게 상세정보를 불러오는데 실패했습니다.</Text>;
  }

  return (
    <MarketDetailPage
      name={marketDetail.name}
      hasLike={marketDetail.hasLike}
      pickupStartAt={marketDetail.pickupStartAt}
      pickupEndAt={marketDetail.pickupEndAt}
      address={marketDetail.address}
      products={marketDetail.products.filter(
        product => product.productStatus !== 'HIDDEN',
      )}
      id={marketDetail.id}
      specificAddress={marketDetail.specificAddress}
      summary={marketDetail.summary}
      latitude={marketDetail.latitude}
      longitude={marketDetail.longitude}
      averageRating={marketDetail.averageRating}
      likeNum={marketDetail.likeNum}
      reviewNum={marketDetail.reviewNum}
    />
  );
};

export default MarketDetailScreen;
