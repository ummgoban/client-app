import React from 'react';
import {format} from '@/utils/date';
import S from './OrderDescription.style';
import {TouchableOpacity} from 'react-native';
import MarketInfo from '../CartPage/MarketInfo';
type Props = {
  id: string;
  orderMemberName: string;
  createdAt: string;
  pickupReservedAt: string;
  marketId: number;
  marketName: string;
  orderStatus:
    | 'ORDERED'
    | 'ACCEPTED'
    | 'PICKEDUP'
    | 'CANCELED'
    | 'NO_SHOW'
    | 'IN_PROGRESS'
    | 'PICKEDUP_OR_CANCELED';
  navigation: any;
  marketAddress: string;
};

const OrderCustomerInfo = ({
  id,
  marketId,
  marketName,
  orderMemberName,
  createdAt,
  pickupReservedAt,
  orderStatus,
  navigation,
  marketAddress,
}: Props) => {
  const getOrderStatusText = () => {
    switch (orderStatus) {
      case 'ORDERED':
        return '주문 확인중이에요';
      case 'ORDERED':
        return '주문 확인중이에요';
      case 'ACCEPTED':
        return '픽업 대기중이에요.';
      case 'PICKEDUP':
        return '픽업이 완료되었어요.';
      case 'CANCELED':
        return '주문이 취소되었어요.';
      case 'NO_SHOW':
        return '노쇼 처리된 주문입니다.';
      case 'PICKEDUP_OR_CANCELED':
        return '완료된 주문입니다.';
      default:
        return '상태를 알 수 없습니다.';
    }
  };

  return (
    <S.Container>
      <S.OrderStatusText>{getOrderStatusText()}</S.OrderStatusText>
      <S.MarketInformation
        onPress={() => navigation.navigate('Market', {marketId})}>
        <S.MarketName>{marketName}</S.MarketName>
        <S.MarketAddress>{marketAddress}</S.MarketAddress>
      </S.MarketInformation>
      <S.OrderDescription>
        <S.OrderDescriptionText>
          주문자: {orderMemberName}
        </S.OrderDescriptionText>
        <S.OrderDescriptionText>주문 번호: {id}</S.OrderDescriptionText>
        <S.OrderDescriptionText>
          {`주문 일시: ${format(new Date(createdAt).getTime(), 'YYYY. MM. DD. (ddd) A hh:mm')}`}
        </S.OrderDescriptionText>
        <S.OrderDescriptionText>
          {`픽업 예정 시간: ${format(new Date(pickupReservedAt).getTime(), 'YYYY. MM. DD. (ddd) A hh:mm')}`}
        </S.OrderDescriptionText>
      </S.OrderDescription>
    </S.Container>
  );
};

export default OrderCustomerInfo;
