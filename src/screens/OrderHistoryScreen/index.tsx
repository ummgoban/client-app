import React, {useState, useEffect, useCallback} from 'react';
import {RootStackParamList} from '@/types/StackNavigationType';
import {OrderType} from '@/types/OrderType';
import {getOrderHistory} from '@/apis';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert, RefreshControl, View} from 'react-native';
import S from './OrderHistory.style';
import OrderHistory from '@/components/orderHistory/OrderHistory';
import useProfile from '@/hooks/useProfile';
import {Button, Text} from 'react-native-paper';

const OrderHistoryScreen = () => {
  const [historyList, setHistoryList] = useState<OrderType[] | null>(null);

  const {profile} = useProfile();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Detail'>>();

  const fetchData = useCallback(async () => {
    if (!profile) {
      return;
    }
    const res = await getOrderHistory();
    if (!res) {
      Alert.alert('주문 내역을 불러오는데 실패했습니다.');
      return;
    }

    setHistoryList(res);

    console.log(res);
  }, [profile]);

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!profile) {
    return (
      <View>
        <Text>로그인 후 주문 목록을 확인해보세요.</Text>
        <Button onPress={() => navigation.navigate('Login')} mode="contained">
          로그인하러가기
        </Button>
      </View>
    );
  }
  console.log(historyList);

  if (!historyList?.length) {
    return (
      <View>
        <Text>주문 내역이 없습니다.</Text>
        <Button onPress={() => navigation.navigate('Feed')} mode="contained">
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
            screen: 'Market',
            params: {marketId: marketId},
          })
        }
      />
    </S.OrderHistoryContainer>
  );
};

export default OrderHistoryScreen;
