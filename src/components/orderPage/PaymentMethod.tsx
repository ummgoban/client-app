import React, {useEffect} from 'react';
import {View} from 'react-native';

import {WidgetSelectedPaymentMethod} from '@tosspayments/tosspayments-sdk';

import useTossPayment from '@/hooks/useTossPayment';

import S from './PaymentMethod.style';

const PaymentMethod = ({value}: {value: number}) => {
  const tossPayment = useTossPayment();

  useEffect(() => {
    const renderPaymentMethods = async () => {
      const widget = tossPayment.widget();

      await widget.setAmount({
        currency: 'KRW',
        value,
      });

      const paymentMethodWidget = await widget.renderPaymentMethods({
        selector: '#payment-method',
      });

      paymentMethodWidget.on(
        'paymentMethodSelect',
        (paymentMethod: WidgetSelectedPaymentMethod) => {
          console.log(paymentMethod);
        },
      );
    };

    renderPaymentMethods();
  }, [tossPayment, value]);

  return (
    <S.Card>
      <S.HeaderText>결제수단</S.HeaderText>
      <View id="payment-method" />
    </S.Card>
  );
};

export default PaymentMethod;
