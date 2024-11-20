import {getMarket} from '@/apis';
import {MarketDetailType} from '@/types/Market';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert, Text} from 'react-native';
import MarketDetailPage from './MarketDetailPage';

// TODO : getMarketDetail

type Props = StackScreenProps<DetailStackParamList, 'Market'>;

const MarketDetailScreen = ({navigation, route}: Props) => {
  const [marketDetail, setMarketDetail] = useState<MarketDetailType | null>(
    null,
  );

  useEffect(() => {
    const fetchMarketDetail = async () => {
      const res = await getMarket(route.params.marketId);
      if (!res) {
        Alert.alert('가게 상세정보를 불러오는데 실패했습니다.');
        return;
      }

      setMarketDetail(res);
    };

    fetchMarketDetail();
  }, [route.params.marketId]);

  useEffect(() => {
    navigation.setOptions({
      title: marketDetail?.name ?? '가게 정보',
    });
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
    />
  );
};

export default MarketDetailScreen;
