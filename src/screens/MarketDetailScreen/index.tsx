import {StackScreenProps} from '@react-navigation/stack';
import {Alert, Text} from 'react-native';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {useState, useEffect} from 'react';
import {getMarketDetail} from '@/apis';
import {MarketType} from '@/types/Market';
import React from 'react';
import MarketDetailPage from './MarketDetailPage';

// TODO : getMarketDetail

type Props = StackScreenProps<DetailStackParamList, 'Market'>;

const MarketDetailScreen = ({route}: Props) => {
  const [marketDetail, setMarketDetail] = useState<MarketType | null>(null);

  useEffect(() => {
    const fetchMarketDetail = async () => {
      const res = await getMarketDetail(route.params.marketId);
      if (!res) {
        Alert.alert('가게 상세정보를 불러오는데 실패했습니다.');
        return;
      }

      setMarketDetail(res);
    };

    fetchMarketDetail();
  }, [route.params.marketId]);

  if (!marketDetail) {
    return <Text>가게 상세정보를 불러오는데 실패했습니다.</Text>;
  }

  return (
    <MarketDetailPage
      name={marketDetail.name}
      pickupStartAt={marketDetail.pickupStartAt}
      pickupEndAt={marketDetail.pickupEndAt}
      address={marketDetail.address}
      products={marketDetail.products}
    />
  );
};

export default MarketDetailScreen;
