import React from 'react';
import {PaymentWidgetProvider} from '@tosspayments/widget-sdk-react-native';

// TODO: Replace the clientKey and customerKey with your own keys
const TossPaymentProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <PaymentWidgetProvider
      clientKey={`test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm`}
      customerKey={`wGidPqu8iPkhWTQaqm_Ad`}>
      {children}
    </PaymentWidgetProvider>
  );
};

export default TossPaymentProvider;
