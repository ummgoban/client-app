import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';

import {useOrderDetailQuery} from '@/apis/orders';

import CustomActivityIndicator from '@/components/common/ActivityIndicator';
import OrderDescription from '@/components/orderDetail/OrderDescription';
import OrderPaymentDescription from '@/components/orderDetail/OrderPaymentDescription';

import {DetailStackParamList} from '@/types/StackNavigationType';

import S from './OrderDetailScreen.style';

type OrderDetailScreenProps = StackScreenProps<
  DetailStackParamList,
  'OrderDetail'
>;

const OrderDetailScreen = ({navigation, route}: OrderDetailScreenProps) => {
  const {ordersId} = route.params;

  const {data: orderDetail} = useOrderDetailQuery(ordersId);

  if (!orderDetail) {
    return <CustomActivityIndicator />;
  }

  return (
    <S.Container>
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
