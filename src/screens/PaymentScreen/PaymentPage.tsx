import {BottomButton} from '@components/common';
import DatePicker from '@components/orderPage/DatePicker';
import PaymentMethod from '@components/orderPage/PaymentMethod';
import PaymentSummary from '@components/orderPage/PaymentSummary';
import {CartType} from '@/types/OrderType';
import React, {useMemo, useState} from 'react';
import {Alert} from 'react-native';
import S from './PaymentPage.style';

const paymentMethodKind = {
  toss: '토스',
  kakao: '카카오페이',
} as const;

type PaymentMethodKindKeyType = keyof typeof paymentMethodKind;

type Props = {cart: CartType};

const PaymentPage = ({cart}: Props) => {
  const [method, setMethod] = useState<PaymentMethodKindKeyType>('toss');

  const {originalPrice, discountPrice} = useMemo(
    () =>
      cart.products.reduce(
        (acc, cur) => ({
          originalPrice: acc.originalPrice + cur.originalPrice * cur.count,
          discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
        }),
        {originalPrice: 0, discountPrice: 0},
      ),
    [cart.products],
  );

  return (
    <S.PaymentPage>
      <S.ScrollView>
        <DatePicker />
        <PaymentMethod
          value={method}
          onChange={setMethod}
          paymentMethodKind={paymentMethodKind}
        />
        <PaymentSummary
          originalPrice={originalPrice}
          discountPrice={discountPrice}
        />
      </S.ScrollView>
      <BottomButton onPress={() => Alert.alert(`${method}로 결제하기로 이동`)}>
        결제하기
      </BottomButton>
    </S.PaymentPage>
  );
};

export default PaymentPage;
