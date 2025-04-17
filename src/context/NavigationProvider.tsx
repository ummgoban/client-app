import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '@/types/StackNavigationType';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const NavigationProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
  );
};

export default NavigationProvider;
