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

type OrderDetailScreenProps = StackScreenProps<
  DetailStackParamList,
  'OrderDetail'
>;

// type OrderDetailScreenProps = StackScreenProps<
//   OrderStackParamList,
//   'OrderDetail'
// >;

const OrderDetailScreen = ({navigation, route}: OrderDetailScreenProps) => {
  const {ordersId} = route.params;

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
        marketName={orderDetail.marketName}
        marketId={orderDetail.marketId}
        orderMemberName={orderDetail.orderMemberName}
        createdAt={orderDetail.createdAt}
        pickupReservedAt={orderDetail.pickupReservedAt}
        navigation={navigation}
        orderStatus={orderDetail.ordersStatus}
        marketAddress={orderDetail.address}
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
