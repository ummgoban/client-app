import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import EmotionProvider from './EmotionProvider';
import TossPaymentProvider from './TossPaymentProvider';
import ReactQueryProvider from './ReactQueryProvider';
import NotificationProvider from './NoticifationProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaProvider>
      <NavigationProvider>
        <NotificationProvider>
          <ReactQueryProvider>
            <EmotionProvider>
              <ReactNativePaperProvider>
                <TossPaymentProvider>{children}</TossPaymentProvider>
              </ReactNativePaperProvider>
            </EmotionProvider>
          </ReactQueryProvider>
        </NotificationProvider>
      </NavigationProvider>
    </SafeAreaProvider>
  );
};

export default RootProvider;
