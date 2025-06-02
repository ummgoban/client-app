import React, {useMemo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {OrderDetailType} from '@/types/OrderType';

import {format} from '@/utils/date';
import {to6DigitHash} from '@ummgoban/shared';

import {DetailStackParamList} from '@/types/StackNavigationType';

import S from './OrderDescription.style';

type Props = {
  id: string;
  navigation: StackNavigationProp<
    DetailStackParamList,
    'OrderDetail',
    undefined
  >;
  orderDetail: OrderDetailType;
};

const OrderCustomerInfo = ({id, navigation, orderDetail}: Props) => {
  const hashOrderId = useMemo(() => to6DigitHash(id), [id]);

  const orderStatusText = useMemo(() => {
    switch (orderDetail.ordersStatus) {
      case 'IN_PROGRESS':
        return '결제가 진행중이에요!';
      case 'ORDERED':
        return '주문 확인중이에요!';
      case 'ACCEPTED':
        return '픽업 대기중이에요!';
      case 'PICKEDUP':
        return '픽업이 완료되었어요!';
      case 'CANCELED':
        return '주문이 취소되었어요.';
      case 'NO_SHOW':
        return '노쇼 처리된 주문이에요.';
      case 'PICKEDUP_OR_CANCELED':
        return '완료된 주문이에요.';
      default:
        return '상태를 알 수 없습니다.';
    }
  }, [orderDetail.ordersStatus]);

  return (
    <S.Container>
      <S.OrderStatusText>{orderStatusText}</S.OrderStatusText>
      <S.MarketInformation
        onPress={() =>
          navigation.navigate('MarketDetail', {marketId: orderDetail.marketId})
        }>
        <S.MarketName>{orderDetail.marketName}</S.MarketName>
        <S.MarketAddress>{orderDetail.address}</S.MarketAddress>
      </S.MarketInformation>
      <S.OrderDescription>
        <S.OrderDescriptionText>
          {`주문자: ${orderDetail.orderMemberName}`}
        </S.OrderDescriptionText>
        <S.OrderDescriptionText>
          {`주문 번호: ${hashOrderId}`}
        </S.OrderDescriptionText>
        <S.OrderDescriptionText>
          {`주문 일시: ${format(orderDetail.createdAt, 'YYYY. MM. DD. (dd) A hh:mm')}`}
        </S.OrderDescriptionText>
        <S.OrderDescriptionText>
          {`픽업 예정 시간: ${format(orderDetail.pickupReservedAt, 'YYYY. MM. DD. (dd) A hh:mm')}`}
        </S.OrderDescriptionText>
        <S.OrderDescriptionText>
          {`완료 시간: ${format(orderDetail.doneAt, 'YYYY. MM. DD. (dd) A hh:mm')}`}
        </S.OrderDescriptionText>
      </S.OrderDescription>
    </S.Container>
  );
};

export default OrderCustomerInfo;
