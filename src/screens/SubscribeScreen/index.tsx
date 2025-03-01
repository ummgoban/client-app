import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {RefreshControl, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {useSubscribeList} from '@/apis/markets';

import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';

import CustomActivityIndicator from '@/components/common/ActivityIndicator';
import SubscribeMarketCard from '@/components/subscribePage/SubscribeMarketCard';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './SubscribeScreen.style';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Subscribe'>;
};

const SubscribeScreen = ({navigation}: Props) => {
  const {data: subscribeList, refetch, isLoading} = useSubscribeList();

  const markets = subscribeList
    ? subscribeList?.pages.flatMap(page => page.markets)
    : [];

  const {profile} = useProfile();

  const {refreshing, onRefresh} = usePullDownRefresh(async () => {
    await refetch();
  });

  const onPressStore = (marketId: number) => {
    navigation.navigate('Detail', {
      screen: 'Market',
      params: {marketId},
    });
  };

  if (!profile) {
    return (
      <View>
        <Text>로그인 후 가게를 찜해보세요.</Text>
        <Button
          onPress={() => navigation.navigate('Register', {screen: 'Login'})}
          mode="contained">
          로그인하러가기
        </Button>
      </View>
    );
  }

  if (isLoading) {
    <View>
      <CustomActivityIndicator />
    </View>;
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
