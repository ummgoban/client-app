import React from 'react';
import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import EmotionProvider from './EmotionProvider';
import TossPaymentProvider from './TossPaymentProvider';
import ReactQueryProvider from './ReactQueryProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationProvider>
      <ReactQueryProvider>
        <EmotionProvider>
          <ReactNativePaperProvider>
            <TossPaymentProvider>{children}</TossPaymentProvider>
          </ReactNativePaperProvider>
        </EmotionProvider>
      </ReactQueryProvider>
    </NavigationProvider>
  );
};

export default RootProvider;
