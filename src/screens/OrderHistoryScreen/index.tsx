import React from 'react';
import {RefreshControl, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useOrderHistoryQuery} from '@/apis/orders';

import OrderHistory from '@/components/orderHistory/OrderHistory';

import useProfile from '@/hooks/useProfile';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './OrderHistory.style';

const OrderHistoryScreen = () => {
  const {data: historyList, refetch} = useOrderHistoryQuery();

  const {profile} = useProfile();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {refreshing, onRefresh} = usePullDownRefresh(async () => {
    refetch();
  });

  if (!profile) {
    return (
      <View>
        <Text>로그인 후 주문 목록을 확인해보세요.</Text>
        <Button
          onPress={() => navigation.navigate('Register', {screen: 'Login'})}
          mode="contained">
          로그인하러가기
        </Button>
      </View>
    );
  }

  if (!historyList?.length) {
    return (
      <View>
        <Text>주문 내역이 없습니다.</Text>
        <Button
          onPress={() => navigation.navigate('Feed', {screen: 'Market'})}
          mode="contained">
          주문하러가기
        </Button>
      </View>
    );
  }

  return (
    <S.OrderHistoryContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <OrderHistory
        historyList={historyList}
        onPressMarket={marketId =>
          navigation.navigate('Detail', {
            screen: 'MarketDetail',
            params: {marketId: marketId},
          })
        }
      />
    </S.OrderHistoryContainer>
  );
};

export default OrderHistoryScreen;
