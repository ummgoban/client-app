import OrderCustomerInfo from '@/components/orderDetail/OrderCustomerInfo';
import OrderProductsInfo from '@/components/orderDetail/OrderProductsInfo';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useState, useEffect} from 'react';
import S from './OrderDetailScreen.style';
import {getOrderDetail} from '@/apis';
import {Alert, RefreshControl} from 'react-native';
import {OrderDetailType} from '@/types/OrderType';
import usePullDownRefresh from '@/hooks/usePullDownRefresh';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MarketInfo from '@/components/CartPage/MarketInfo';

type OrderDetailScreenProps = StackScreenProps<
  DetailStackParamList,
  'OrderDetail'
>;

// type OrderDetailScreenProps = StackScreenProps<
//   OrderStackParamList,
//   'OrderDetail'
// >;

const OrderDetailScreen = ({route}: OrderDetailScreenProps) => {
  const {marketId, ordersId, marketName} = route.params;

  const navigation =
    useNavigation<StackNavigationProp<DetailStackParamList, 'OrderDetail'>>();
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);

  const fetchData = useCallback(async () => {
    const res = await getOrderDetail(ordersId);
    if (!res) {
      Alert.alert('주문 내역을 불러오는데 실패했습니다.');
      return;
    }
    setOrderDetail(res);
  }, []);

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!orderDetail) {
    Alert.alert('주문 내역을 불러오는데 실패했습니다.');
    return;
  }

  return (
    <S.Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <OrderCustomerInfo
        id={ordersId}
        marketName={marketName}
        marketId={marketId}
        orderMemberName={orderDetail.orderMemberName}
        createdAt={orderDetail.createdAt}
        pickupReservedAt={orderDetail.pickupReservedAt}
        customerRequest={orderDetail.customerRequest}
      />
      <S.HorizonDivider />
      <OrderProductsInfo
        products={orderDetail.products}
        totalPrice={orderDetail.ordersPrice}
      />
    </S.Container>
  );
};

export default OrderDetailScreen;
