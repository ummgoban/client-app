import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeNavigator from './HomeNavigator';
import RegisterNavigator from './RegisterNavigator';
import DetailNavigator from './DetailNavigator';
import CartNavigator from './CartNavigator';
import MyPageNavigator from './MyPageNavigator';
import withWebViewGate from './withWebViewGate';

import {RootStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<RootStackParamList>();

const HomeWithGate = withWebViewGate(HomeNavigator);
const RegisterWithGate = withWebViewGate(RegisterNavigator);
const DetailWithGate = withWebViewGate(DetailNavigator);
const CartWithGate = withWebViewGate(CartNavigator);
const MyPageWithGate = withWebViewGate(MyPageNavigator);

const AppNavigator = () => {
  /** omit top, because of `@react-navigation/stack` appbar containing top safe area */
  // const {left, right, bottom} = useSafeAreaInsets();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeWithGate} />
      <Stack.Screen name="Register" component={RegisterWithGate} />
      <Stack.Screen name="Detail" component={DetailWithGate} />
      <Stack.Screen name="CartRoot" component={CartWithGate} />
      <Stack.Screen name="MyPageRoot" component={MyPageWithGate} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
