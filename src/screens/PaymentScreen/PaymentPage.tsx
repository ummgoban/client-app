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

import {requestOrder, requestOrderSuccess} from '@/apis';
import {BucketType} from '@/types/Bucket';
import {RootStackParamList} from '@/types/StackNavigationType';
import {BottomButton} from '@components/common';
import {
  DatePickerCard,
  PaymentMethod,
  PaymentSummary,
} from '@components/orderPage';

import S from './PaymentPage.style';

type Props = {cart: BucketType};

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
        <PaymentMethod>
          <PaymentMethodWidget
            selector="payment-methods"
            onLoadEnd={() => {
              paymentWidgetControl
                .renderPaymentMethods(
                  'payment-methods',
                  {value: discountPrice},
                  {
                    variantKey: 'DEFAULT',
                  },
                )
                .then(control => {
                  console.debug({control});
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
        </PaymentMethod>
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

          const orderRes = await requestOrder(cart);

          if (orderRes == null) {
            Alert.alert('주문 정보를 가져오지 못했습니다.');
            return;
          }

          const tossPaymentRes =
            await paymentWidgetControl.requestPayment?.(orderRes);

          if (tossPaymentRes == null) {
            Alert.alert('결제 정보를 가져오지 못했습니다.');
            return;
          }

          console.debug(tossPaymentRes);

          if (tossPaymentRes.success) {
            // 결제 성공 비즈니스 로직을 구현하세요.
            // result.success에 있는 값을 서버로 전달해서 결제 승인을 호출하세요.
            const successRes = await requestOrderSuccess(
              tossPaymentRes.success,
            );

            if (!successRes) {
              Alert.alert('결제 승인을 실패했습니다.');
              return;
            }

            navigation.navigate('Detail', {
              screen: 'OrderDone',
              params: {
                orderId: tossPaymentRes.success.orderId,
                products: cart.products,
                originalPrice,
                discountPrice,
              },
            });
          } else if (tossPaymentRes.fail) {
            // 결제 실패 비즈니스 로직을 구현하세요.
            Alert.alert('결제 실패');
          }
        }}>
        {`${discountPrice.toLocaleString()}원 결제하기`}
      </BottomButton>
    </S.PaymentPage>
  );
};

export default PaymentPage;
