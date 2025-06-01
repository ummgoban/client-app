import React from 'react';
import {PaymentWidgetProvider} from '@tosspayments/widget-sdk-react-native';
import Config from 'react-native-config';

// TODO: Replace the clientKey and customerKey with your own keys
const TossPaymentProvider = ({children}: {children?: React.ReactNode}) => {
  return (
    <PaymentWidgetProvider
      clientKey={Config.TOSS_CLIENT_KEY}
      customerKey={Config.TOSS_CUSTOMER_KEY}>
      {children}
    </PaymentWidgetProvider>
  );
};

export default TossPaymentProvider;
