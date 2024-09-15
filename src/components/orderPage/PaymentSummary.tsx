import React from 'react';
import Common from './Common';
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
    <Common.Card>
      <S.Header>
        <Common.HeaderText>결제금액</Common.HeaderText>
        <Common.HeaderText>{`${discountPrice.toLocaleString()}원`}</Common.HeaderText>
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
    </Common.Card>
  );
};

export default PaymentSummary;
