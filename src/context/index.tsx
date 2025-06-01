import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {combineProviders, Providers, ProviderEntry} from '@ummgoban/shared';

import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import EmotionProvider from './EmotionProvider';
import TossPaymentProvider from './TossPaymentProvider';
import ReactQueryProvider from './ReactQueryProvider';
import NotificationProvider from './NotificationProvider';

const providers = [
  {
    provider: NavigationProvider,
  },
  {
    provider: NotificationProvider,
  },
  {
    provider: ReactQueryProvider,
  },
  {
    provider: EmotionProvider,
  },
  {
    provider: ReactNativePaperProvider,
  },
  {
    provider: TossPaymentProvider,
  },
] as const satisfies Providers<
  [
    ProviderEntry<typeof NavigationProvider>,
    ProviderEntry<typeof NotificationProvider>,
    ProviderEntry<typeof ReactQueryProvider>,
    ProviderEntry<typeof EmotionProvider>,
    ProviderEntry<typeof ReactNativePaperProvider>,
    ProviderEntry<typeof TossPaymentProvider>,
  ]
>;

const CombinedProvider = combineProviders(providers);

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <SafeAreaProvider>
      <CombinedProvider>{children}</CombinedProvider>
    </SafeAreaProvider>
  );
};

export default RootProvider;
