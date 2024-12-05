import React from 'react';
import {format} from '@/utils/date';
import S from './OrderCustomerInfo.style';
import MarketInfo from '../CartPage/MarketInfo';
type Props = {
  id: string;
  orderMemberName: string;
  createdAt: string;
  pickupReservedAt: string;
  customerRequest: string;
  marketId: number;
  marketName: string;
};

const OrderCustomerInfo = ({
  id,
  marketId,
  marketName,
  orderMemberName,
  createdAt,
  pickupReservedAt,
  customerRequest,
}: Props) => {
  return (
    <S.Container>
      <S.InfoText>주문번호: {id}</S.InfoText>
      <S.InfoText>주문자명: {orderMemberName}</S.InfoText>
      <S.InfoText>
        {`주문 일시: ${format(new Date(createdAt).getTime(), 'YYYY. MM. DD. (ddd) A hh:mm')}`}
      </S.InfoText>
      <S.InfoText>
        {`픽업 예정 시간: ${format(new Date(pickupReservedAt).getTime(), 'YYYY. MM. DD. (ddd) A hh:mm')}`}
      </S.InfoText>
      <S.InfoText>요청사항:</S.InfoText>
      <S.InfoText>{customerRequest}</S.InfoText>
    </S.Container>
  );
};

export default OrderCustomerInfo;
