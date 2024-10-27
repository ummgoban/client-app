import React, {useState, useEffect, useCallback} from 'react';
import {RootStackParamList} from '@/types/StackNavigationType';
import {OrderType} from '@/types/OrderType';
import {getOrderHistory} from '@/apis';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert, RefreshControl} from 'react-native';
import S from './OrderHistory.style';
import OrderHistory from '@/components/orderHistory/OrderHistory';

const OrderHistoryScreen = () => {
  const [historyList, setHistoryList] = useState<OrderType[] | null>(null);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Detail'>>();
  const fetchData = useCallback(async () => {
    const res = await getOrderHistory();
    if (!res) {
      Alert.alert('주문 내역을 불러오는데 실패했습니다.');
      return;
    }

    setHistoryList(res);
  }, []);

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
