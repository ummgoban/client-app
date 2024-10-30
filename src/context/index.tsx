import React from 'react';
import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import EmotionProvider from './EmotionProvider';
import TossPaymentProvider from './TossPaymentProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationProvider>
      <EmotionProvider>
        <ReactNativePaperProvider>
          <TossPaymentProvider>{children}</TossPaymentProvider>
        </ReactNativePaperProvider>
      </EmotionProvider>
    </NavigationProvider>
  );
};

export default RootProvider;
