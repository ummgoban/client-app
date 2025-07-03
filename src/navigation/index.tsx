import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeNavigator from './HomeNavigator';
import RegisterNavigator from './RegisterNavigator';
import DetailNavigator from './DetailNavigator';
import CartNavigator from './CartNavigator';
import MyPageNavigator from './MyPageNavigator';

import {RootStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  /** omit top, because of `@react-navigation/stack` appbar containing top safe area */
  // const {left, right, bottom} = useSafeAreaInsets();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Register" component={RegisterNavigator} />
      <Stack.Screen name="Detail" component={DetailNavigator} />
      <Stack.Screen name="CartRoot" component={CartNavigator} />
      <Stack.Screen name="MyPageRoot" component={MyPageNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
