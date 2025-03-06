import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeNavigator from './HomeNavigator';
import RegisterNavigator from './RegisterNavigator';
import DetailNavigator from './DetailNavigator';
import CartNavigator from './CartNavigator';
import MyPageNavigator from './MyPageNavigator';

import {RootStackParamList} from '@/types/StackNavigationType';

import S from './Layout.style';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  /** omit top, because of `@react-navigation/stack` appbar containing top safe area */
  const {left, right, bottom} = useSafeAreaInsets();

  return (
    <S.Layout left={left} right={right} bottom={bottom}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Register" component={RegisterNavigator} />
        <Stack.Screen name="Detail" component={DetailNavigator} />
        <Stack.Screen name="CartRoot" component={CartNavigator} />
        <Stack.Screen name="MyPageRoot" component={MyPageNavigator} />
      </Stack.Navigator>
    </S.Layout>
  );
};

export default AppNavigator;
