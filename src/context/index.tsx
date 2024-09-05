import React from 'react';
import NavigationProvider from './NavigationProvider';

const RootProvider = ({children}: {children: React.ReactNode}) => {
  return <NavigationProvider>{children}</NavigationProvider>;
};

export default RootProvider;
