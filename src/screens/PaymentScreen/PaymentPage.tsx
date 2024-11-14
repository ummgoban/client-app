import React, {useMemo, useState} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  AgreementWidget,
  AgreementWidgetControl,
  PaymentMethodWidget,
  usePaymentWidget,
} from '@tosspayments/widget-sdk-react-native';

import {CartType} from '@/types/OrderType';
import {RootStackParamList} from '@/types/StackNavigationType';
import {BottomButton} from '@components/common';
import {DatePickerCard, PaymentSummary} from '@components/orderPage';

import S from './PaymentPage.style';

type Props = {cart: CartType};

const PaymentPage = ({cart}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {originPrice, discountPrice} = useMemo(
    () =>
      cart.products.reduce(
        (acc, cur) => ({
          originPrice: acc.originPrice + cur.originPrice * cur.count,
          discountPrice: acc.discountPrice + cur.discountPrice * cur.count,
        }),
        {originPrice: 0, discountPrice: 0},
      ),
    [cart.products],
  );

  const paymentWidgetControl = usePaymentWidget();
  const [agreementWidgetControl, setAgreementWidgetControl] =
    useState<AgreementWidgetControl | null>(null);

  return (
    <S.PaymentPage>
      <S.ScrollView>
        <DatePickerCard />
        <>
          <PaymentMethodWidget
            selector="payment-methods"
            onLoadEnd={() => {
              paymentWidgetControl
                .renderPaymentMethods(
                  'payment-methods',
                  {value: 50000},
                  {
                    variantKey: 'DEFAULT',
                  },
                )
                .then(control => {
                  console.log({control});
                });
            }}
          />
          <AgreementWidget
            selector="agreement"
            onLoadEnd={() => {
              paymentWidgetControl
                .renderAgreement('agreement', {
                  variantKey: 'DEFAULT',
                })
                .then(control => {
                  setAgreementWidgetControl(control);
                });
            }}
          />
        </>
        <PaymentSummary
          originPrice={originPrice}
          discountPrice={discountPrice}
        />
      </S.ScrollView>
      <BottomButton
        onPress={async () => {
          if (paymentWidgetControl == null || agreementWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.');
            return;
          }

          const agreeement = await agreementWidgetControl.getAgreementStatus();
          if (agreeement.agreedRequiredTerms !== true) {
            Alert.alert('약관에 동의하지 않았습니다.');
            return;
          }

          paymentWidgetControl
            .requestPayment?.({
              orderId: '1lB4sMvBNySuMmzDy5PPv',
              orderName: '토스 티셔츠 외 2건',
            })
            .then(result => {
              if (result?.success) {
                // 결제 성공 비즈니스 로직을 구현하세요.
                // result.success에 있는 값을 서버로 전달해서 결제 승인을 호출하세요.
                navigation.navigate('Detail', {
                  screen: 'OrderDone',
                  params: {orderId: 1},
                });
              } else if (result?.fail) {
                // 결제 실패 비즈니스 로직을 구현하세요.
                Alert.alert('결제 실패');
              }
            });
        }}>
        {`${discountPrice.toLocaleString()}원 결제하기`}
      </BottomButton>
    </S.PaymentPage>
  );
};

export default PaymentPage;
