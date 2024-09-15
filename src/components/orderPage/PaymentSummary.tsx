import React from 'react';
import S from './PaymentSummary.style';

const PaymentSummaryItem = ({
  title,
  price,
  primary = false,
}: {
  title: string;
  price: string;
  primary?: boolean;
}) => {
  return (
    <S.PaymentSummaryItemContainer>
      <S.ItemText>{title}</S.ItemText>
      <S.ItemText primary={primary}>{price}</S.ItemText>
    </S.PaymentSummaryItemContainer>
  );
};

type Props = {
  originalPrice: number;
  discountPrice: number;
};

const PaymentSummary = ({originalPrice, discountPrice}: Props) => {
  return (
    <S.PaymentSummaryContainer>
      <S.Header>
        <S.HeaderText>결제금액</S.HeaderText>
        <S.HeaderText>{`${discountPrice.toLocaleString()}원`}</S.HeaderText>
      </S.Header>
      <S.PaymentSummaryItemList>
        <PaymentSummaryItem
          title="주문금액"
          price={`${originalPrice.toLocaleString()}원`}
        />
        <PaymentSummaryItem
          title="할인금액"
          price={`-${(originalPrice - discountPrice).toLocaleString()}원`}
          primary
        />
      </S.PaymentSummaryItemList>
    </S.PaymentSummaryContainer>
  );
};

export default PaymentSummary;
