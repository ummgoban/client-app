import React, {useMemo} from 'react';
import {Text} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {CartType} from '@/types/OrderType';
import {RootStackParamList} from '@/types/StackNavigationType';
import {BottomButton} from '@components/common';
import {DatePickerCard, PaymentSummary} from '@components/orderPage';

import S from './PaymentPage.style';

type Props = {cart: CartType};

const PaymentPage = ({cart}: Props) => {
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
        <Text>{'// TODO: 결제수단 서버에서 받아와야 함'}</Text>
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
