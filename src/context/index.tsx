import React from 'react';
import NavigationProvider from './NavigationProvider';
import ReactNativePaperProvider from './ReactNativePaperProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationProvider>
      <ReactNativePaperProvider>{children}</ReactNativePaperProvider>
    </NavigationProvider>
  );
};

export default RootProvider;
