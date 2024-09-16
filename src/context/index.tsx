import React from 'react';
import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';
import EmotionProvider from './EmotionProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationProvider>
      <EmotionProvider>
        <ReactNativePaperProvider>{children}</ReactNativePaperProvider>
      </EmotionProvider>
    </NavigationProvider>
  );
};

export default RootProvider;
