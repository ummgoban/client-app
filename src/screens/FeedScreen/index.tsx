import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl, Text, View} from 'react-native';

import {getMarketList} from '@/apis';
import {Market, SearchTab} from '@/components/feedPage';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {MarketType} from '@/types/Market';
import {RootStackParamList} from '@/types/StackNavigationType';

import S from './SearchBar.style';
import {
  handleForegroundMessage,
  requestUserPermission,
  requestNotificationPermission,
  setBackgroundMessageHandler,
} from '@/utils/fcm';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const FeedScreen = ({navigation}: Props) => {
  // TODO: cursor pagination 무한 스크롤 구현
  const [marketList, setMarketList] = useState<MarketType[] | null>(null);
  const fetchData = useCallback(async () => {
    const res = await getMarketList();
    if (!res) {
      Alert.alert('가게내역받아오기실패.');
      return;
    }
    setMarketList(res.markets);
  }, []);

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    navigation.setOptions({
      title: '주변 가게 조회',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Arial',
      },
    });
    // TODO: fcm permission 로직 위치 논의 필요
    requestNotificationPermission();
    const unsubscribe = handleForegroundMessage();
    requestUserPermission();
    setBackgroundMessageHandler();
    fetchData();
    return unsubscribe;
  }, [fetchData]);

  if (!marketList) {
    return (
      <View>
        <Text>가게목록을 불러오는데 실패했습니다.</Text>
      </View>
    );
  }

  return (
    <S.Container>
      <S.SearchWrapper>
        <SearchTab />
      </S.SearchWrapper>
      <S.MarketWrapper
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {marketList.length === 0 ? (
          // TODO: 상품이 없을 때 렌더링
          <Text>상품이 없습니다.</Text>
        ) : (
          marketList.map(market => (
            <Market key={market.id} onPress={onPressStore} market={market} />
          ))
        )}
      </S.MarketWrapper>
    </S.Container>
  );
};
export default FeedScreen;
