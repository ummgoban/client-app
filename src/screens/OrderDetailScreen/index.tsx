import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';

import {getOrderDetail} from '@/apis';

import CustomActivityIndicator from '@/components/common/ActivityIndicator';
import OrderDescription from '@/components/orderDetail/OrderDescription';
import OrderPaymentDescription from '@/components/orderDetail/OrderPaymentDescription';

import usePullDownRefresh from '@/hooks/usePullDownRefresh';

import {OrderDetailType} from '@/types/OrderType';
import {DetailStackParamList} from '@/types/StackNavigationType';

import S from './OrderDetailScreen.style';

type OrderDetailScreenProps = StackScreenProps<
  DetailStackParamList,
  'OrderDetail'
>;

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
  }, [ordersId]);

  const {refreshing, onRefresh} = usePullDownRefresh(fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!orderDetail) {
    return <CustomActivityIndicator />;
  }

  return (
    <S.Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <OrderDescription
        id={ordersId}
        navigation={navigation}
        orderDetail={orderDetail}
      />
      <S.HorizonDivider />
      <OrderPaymentDescription
        paymentMethod={orderDetail.method}
        products={orderDetail.products}
        totalPrice={orderDetail.ordersPrice}
      />
    </S.Container>
  );
};

export default OrderDetailScreen;
