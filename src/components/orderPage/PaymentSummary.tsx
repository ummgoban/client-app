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
  originPrice: number;
  discountPrice: number;
};

// TODO: HeaderPaymentMethod 삭제 후 border-bottom 이동
const PaymentSummary = ({originPrice, discountPrice}: Props) => {
  return (
    <S.Card>
      <S.Header>
        <S.HeaderText>결제금액</S.HeaderText>
        <S.HeaderText>{`${discountPrice.toLocaleString()}원`}</S.HeaderText>
      </S.Header>
      <S.HeaderPaymentMethod>
        <S.HeaderText>결제방법 </S.HeaderText>
        <S.HeaderText>만나서 결제</S.HeaderText>
      </S.HeaderPaymentMethod>
      <S.PaymentSummaryItemList>
        <PaymentSummaryItem
          title="주문금액"
          price={`${originPrice.toLocaleString()}원`}
        />
        <PaymentSummaryItem
          title="할인금액"
          price={`-${(originPrice - discountPrice).toLocaleString()}원`}
          primary
        />
        <PaymentSummaryItem
          title="인앱 결제는 차후 추가될 예정입니다!"
          price=" "
          primary
        />
      </S.PaymentSummaryItemList>
    </S.Card>
  );
};

export default PaymentSummary;
