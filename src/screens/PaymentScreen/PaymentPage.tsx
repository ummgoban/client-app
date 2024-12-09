import React, {useMemo, useState} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// import {
//   AgreementWidget,
//   AgreementWidgetControl,
//   PaymentMethodWidget,
//   usePaymentWidget,
// } from '@tosspayments/widget-sdk-react-native';

import {requestOrder} from '@/apis';
import {BucketType} from '@/types/Bucket';
import {MarketDetailType} from '@/types/Market';
import {RootStackParamList} from '@/types/StackNavigationType';
import {BottomButton} from '@components/common';
import {
  DatePickerCard,
  // PaymentMethod,
  PaymentSummary,
} from '@components/orderPage';
import {format} from '@/utils/date';

import S from './PaymentPage.style';

const nowDate = format(new Date(), 'YYYY-MM-DD');

type Props = {cart: BucketType; market: MarketDetailType};

const PaymentPage = ({cart, market}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [pickupReservedAt, setPickupReservedAt] = useState(new Date());

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

  // const paymentWidgetControl = usePaymentWidget();
  // const [agreementWidgetControl, setAgreementWidgetControl] =
  //   useState<AgreementWidgetControl | null>(null);

  return (
    <S.PaymentPage>
      <S.ScrollView>
        <DatePickerCard
          pickupReservedAt={pickupReservedAt}
          onChange={setPickupReservedAt}
          minimumDate={new Date(`${nowDate}T${market.pickupStartAt}`)}
          maximumDate={new Date(`${nowDate}T${market.pickupEndAt}`)}
        />
        {/* <PaymentMethod>
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
        </PaymentMethod> */}
        <PaymentSummary
          originPrice={originPrice}
          discountPrice={discountPrice}
        />
      </S.ScrollView>
      <BottomButton
        onPress={async () => {
          // if (paymentWidgetControl == null || agreementWidgetControl == null) {
          //   Alert.alert('주문 정보가 초기화되지 않았습니다.');
          //   return;
          // }

          // const agreeement = await agreementWidgetControl.getAgreementStatus();
          // if (agreeement.agreedRequiredTerms !== true) {
          //   Alert.alert('약관에 동의하지 않았습니다.');
          //   return;
          // }

          // TODO: 주문 요청 사항
          const orderRes = await requestOrder(
            pickupReservedAt.toISOString(),
            '',
          );

          if (orderRes == null) {
            Alert.alert('주문 정보를 가져오지 못했습니다.');
            return;
          }

          // const tossPaymentRes = await paymentWidgetControl.requestPayment({
          //   orderId: orderRes.ordersId,
          //   orderName: orderRes.ordersName,
          // });

          // if (tossPaymentRes == null) {
          //   Alert.alert('결제 정보를 가져오지 못했습니다.');
          //   return;
          // }

          // if (tossPaymentRes.success) {
          //   const successRes = await requestOrderSuccess(
          //     tossPaymentRes.success.paymentKey,
          //     orderRes.ordersId,
          //     orderRes.amount,
          //   );

          //   if (!successRes) {
          //     Alert.alert('결제 승인을 실패했습니다.');
          //     return;
          //   }

          navigation.navigate('Detail', {
            screen: 'OrderDone',
            params: {
              orderId: orderRes.ordersId,
              products: cart.products,
              originPrice,
              discountPrice,
            },
          });
          // } else if (tossPaymentRes.fail) {
          //   // 결제 실패 비즈니스 로직을 구현하세요.
          //   Alert.alert('결제 실패');
          // }
        }}>
        {/* TODO: 결제하기로 변경 */}
        {`${discountPrice.toLocaleString()}원 예약하기`}
      </BottomButton>
    </S.PaymentPage>
  );
};

export default PaymentPage;
