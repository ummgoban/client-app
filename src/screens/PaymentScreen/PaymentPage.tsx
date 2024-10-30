import React, {useMemo, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {CartType} from '@/types/OrderType';
import {RootStackParamList} from '@/types/StackNavigationType';
import {BottomButton} from '@components/common';
import {DatePickerCard, PaymentSummary} from '@components/orderPage';

import S from './PaymentPage.style';

import {
  AgreementWidget,
  AgreementWidgetControl,
  PaymentMethodWidget,
  PaymentMethodWidgetControl,
  usePaymentWidget,
} from '@tosspayments/widget-sdk-react-native';
import {Button, Alert} from 'react-native';

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

  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] =
    useState<PaymentMethodWidgetControl | null>(null);
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
                  setPaymentMethodWidgetControl(control);
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
          <Button
            title="결제요청"
            onPress={async () => {
              if (
                paymentWidgetControl == null ||
                agreementWidgetControl == null
              ) {
                Alert.alert('주문 정보가 초기화되지 않았습니다.');
                return;
              }

              const agreeement =
                await agreementWidgetControl.getAgreementStatus();
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
                  } else if (result?.fail) {
                    // 결제 실패 비즈니스 로직을 구현하세요.
                  }
                });
            }}
          />
          <Button
            title="선택된 결제수단"
            onPress={async () => {
              if (paymentMethodWidgetControl == null) {
                Alert.alert('주문 정보가 초기화되지 않았습니다.');
                return;
              }

              Alert.alert(
                `선택된 결제수단: ${JSON.stringify(await paymentMethodWidgetControl.getSelectedPaymentMethod())}`,
              );
            }}
          />
          <Button
            title="결제 금액 변경"
            onPress={() => {
              if (paymentMethodWidgetControl == null) {
                Alert.alert('주문 정보가 초기화되지 않았습니다.');
                return;
              }

              paymentMethodWidgetControl.updateAmount(100_000).then(() => {
                Alert.alert('결제 금액이 100000원으로 변경되었습니다.');
              });
            }}
          />
        </>
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
