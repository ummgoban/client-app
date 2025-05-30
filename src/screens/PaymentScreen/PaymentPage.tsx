import React, {useMemo, useState} from 'react';
import {Alert, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// import {
//   AgreementWidget,
//   AgreementWidgetControl,
//   PaymentMethodWidget,
//   usePaymentWidget,
// } from '@tosspayments/widget-sdk-react-native';

import {useMarket} from '@/apis/markets';
import {useRequestOrderMutation} from '@/apis/orders';

import {BottomButton} from '@components/common';
import {
  DatePickerCard,
  // PaymentMethod,
  PaymentSummary,
} from '@components/orderPage';

import {BucketType} from '@/types/Bucket';
import {RootStackParamList} from '@/types/StackNavigationType';

import {format} from '@/utils/date';

import S from './PaymentPage.style';
import {Button, Text} from 'react-native-paper';
import {useQueryClient} from '@tanstack/react-query';

const nowDate = format(new Date(), 'YYYY-MM-DD');

const tomorrowDate = format(
  new Date(new Date().setDate(new Date().getDate() + 1)),
  'YYYY-MM-DD',
);

type Props = {cart: BucketType; marketId: number};

const PaymentPage = ({cart, marketId}: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {data: market} = useMarket(marketId);

  const [pickupReservedAt, setPickupReservedAt] = useState(() => {
    if (!market) {
      return new Date();
    }
    const nowTime = new Date().getTime();
    const {openAt, closeAt} = market;

    const startTime = new Date(`${nowDate}T${openAt}`).getTime();
    const endTime = new Date(`${nowDate}T${closeAt}`).getTime();

    if (nowTime < startTime) {
      return new Date(startTime);
    } else if (nowTime > endTime) {
      return new Date(`${tomorrowDate}T${openAt}`);
    }
    return new Date(nowTime);
  });

  const queryClient = useQueryClient();
  const {mutateAsync: requestOrder} = useRequestOrderMutation();

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

  if (!market) {
    return (
      <View>
        <Text>장바구니 정보를 가져오지 못했습니다...!</Text>
        <Button onPress={() => navigation.goBack()}>뒤로 가기</Button>
      </View>
    );
  }

  return (
    <S.PaymentPage>
      <S.ScrollView>
        <DatePickerCard
          pickupReservedAt={pickupReservedAt}
          onChange={setPickupReservedAt}
          minimumDate={new Date(`${nowDate}T${market.openAt}`)}
          maximumDate={new Date(`${nowDate}T${market.closeAt}`)}
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
          const orderRes = await requestOrder({
            pickupReservedAt: format(
              pickupReservedAt,
              'YYYY-MM-DDTHH:mm:ss.000',
            ),
            customerRequest: '',
          });

          if (orderRes == null) {
            Alert.alert('주문 정보를 가져오지 못했습니다.');
            return;
          }
          await queryClient.invalidateQueries({queryKey: ['orderHistory']});
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
