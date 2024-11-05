import React, {useEffect, useState, useCallback} from 'react';
import {View, Alert, Text, RefreshControl, StyleSheet} from 'react-native';
import {SubscribeType} from '@/types/Subscribe';
import {getSubscribeList} from '@/apis/Subscribe';
import SubscribeMarketCard from '@/components/subscribePage/SubscribeMarketCard';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import S from './SubscribeScreen.style';

const SubscribeScreen = () => {
  const [markets, setMarkets] = useState<SubscribeType[] | null>(null);

  const fetchData = useCallback(async () => {
    const res = await getSubscribeList();
    if (!res) {
      Alert.alert('찜 리스트 받아오기 실패');
      return;
    }
    setMarkets(res);
  }, []);
  console.log(markets?.length);
  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!markets) {
    return (
      <View>
        <Text>찜 리스트를 불러오는데 실패했습니다.</Text>
      </View>
    );
  }
  return (
    <S.SubscribeContainer>
      <Text>현재 {markets.length}개 가게를 찜하고 계세요!</Text>
      <S.SubscribeMarketCartWrapper
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {markets.map(item => (
          <SubscribeMarketCard
            key={item.id}
            name={item.name}
            address={item.address}
            specificAddress={item.specificAddress}
            openAt={item.openAt}
            closeAt={item.closeAt}
            // TODO: 가게 대표 이미지로 변경, 현재 response 부재
            thumbnailImage={item.products[0].image}
          />
        ))}
      </S.SubscribeMarketCartWrapper>
    </S.SubscribeContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
});

export default SubscribeScreen;
