import {BottomButton} from '@/components/common';
import DatePicker from '@/components/orderPage/DatePicker';
import PaymentMethod from '@/components/orderPage/PaymentMethod';
import PaymentSummary from '@/components/orderPage/PaymentSummary';
import React, {useMemo} from 'react';
import {Alert} from 'react-native';
import S from './PaymentPage.style';
import {CartType} from '@/types/OrderType';

type Props = {cart: CartType};

const PaymentPage = ({cart}: Props) => {
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
        <PaymentMethod />
        <PaymentSummary
          originalPrice={originalPrice}
          discountPrice={discountPrice}
        />
      </S.ScrollView>
      <BottomButton onPress={() => Alert.alert('결제하기로 이동')}>
        결제하기
      </BottomButton>
    </S.PaymentPage>
  );
};

export default PaymentPage;
