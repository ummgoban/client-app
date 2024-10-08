import {CartType} from '@/types/OrderType';
import {RootStackParamList} from '@/types/StackNavigationType';
import {BottomButton} from '@components/common';
import {
  DatePickerCard,
  PaymentMethod,
  PaymentSummary,
} from '@components/orderPage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import S from './PaymentPage.style';

const paymentMethodKind = {
  toss: '토스',
  kakao: '카카오페이',
} as const;

type PaymentMethodKindKeyType = keyof typeof paymentMethodKind;

type Props = {cart: CartType};

const PaymentPage = ({cart}: Props) => {
  const [method, setMethod] = useState<PaymentMethodKindKeyType>('toss');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
        <DatePickerCard />
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
      <BottomButton
        onPress={() =>
          navigation.navigate('Detail', {
            screen: 'OrderDone',
            params: {orderId: 1},
          })
        }>
        {`${discountPrice.toLocaleString()}원 결제하기`}
      </BottomButton>
    </S.PaymentPage>
  );
};

export default PaymentPage;
