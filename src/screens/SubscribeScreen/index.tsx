import React, {useEffect, useState, useCallback} from 'react';
import {View, Alert, RefreshControl} from 'react-native';
import {SubscribeType} from '@/types/Subscribe';
import {getSubscribeList} from '@/apis/Subscribe';
import SubscribeMarketCard from '@/components/subscribePage/SubscribeMarketCard';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import S from './SubscribeScreen.style';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/StackNavigationType';
import {useIsFocused} from '@react-navigation/native';
import useProfile from '@/hooks/useProfile';
import {Button, Text} from 'react-native-paper';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Subscribe'>;
};

const SubscribeScreen = ({navigation}: Props) => {
  const [markets, setMarkets] = useState<SubscribeType[] | null>(null);

  const isFocused = useIsFocused();

  const {profile} = useProfile();

  const fetchData = useCallback(async () => {
    if (!profile) {
      return;
    }
    const res = await getSubscribeList();
    if (!res) {
      Alert.alert('찜 리스트 받아오기 실패');
      return;
    }
    setMarkets(res.markets);
  }, [profile]);

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [fetchData, isFocused]);

  if (!profile) {
    return (
      <View>
        <Text>로그인 후 가게를 찜해보세요.</Text>
        <Button onPress={() => navigation.navigate('Login')} mode="contained">
          로그인하러가기
        </Button>
      </View>
    );
  }

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
            marketId={item.id}
            name={item.name}
            address={item.address}
            specificAddress={item.specificAddress}
            openAt={item.openAt}
            closeAt={item.closeAt}
            // TODO: 가게 대표 이미지로 변경, 현재 response 부재
            thumbnailImage={item.products[0].image}
            onPress={onPressStore}
          />
        ))}
      </S.SubscribeMarketCartWrapper>
    </S.SubscribeContainer>
  );
};

export default SubscribeScreen;
