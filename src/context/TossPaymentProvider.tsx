import React from 'react';
import {PaymentWidgetProvider} from '@tosspayments/widget-sdk-react-native';

// TODO: Replace the clientKey and customerKey with your own keys
const TossPaymentProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <PaymentWidgetProvider
      clientKey={process.env.TOSS_CLIENT_KEY as string}
      customerKey={`wGidPqu8iPkhWTQaqm_Ad`}>
      {children}
    </PaymentWidgetProvider>
  );
};

export default TossPaymentProvider;
