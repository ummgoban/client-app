import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '@/utils/navigtaionRef';

const NavigationProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
  );
};

export default NavigationProvider;
