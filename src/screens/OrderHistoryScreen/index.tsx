import React, {useCallback} from 'react';
import {RefreshControl} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useOrderHistoryQuery} from '@/apis/orders';

import EmptyComponent from '@/components/common/EmptyComponent';
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

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (!profile) {
    return (
      <EmptyComponent
        title="로그인 후 주문 목록을 확인해보세요."
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
        buttonText="로그인하러 가기"
      />
    );
  }

  if (!historyList?.length) {
    return (
      <EmptyComponent
        onPress={() => navigation.navigate('Feed', {screen: 'Market'})}
        title="주문 내역이 없습니다."
        buttonText="주문하러 가기"
      />
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
