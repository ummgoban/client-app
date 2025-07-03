import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';

import ShoppingCartScreen from '@/screens/ShoppingCartScreen';

import {CartStackParamList} from '@/types/StackNavigationType';
import theme from '@/context/theme';

const Stack = createStackNavigator<CartStackParamList>();

const cartScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="장바구니" />,
  headerTintColor: theme.colors.dark,
};

const CartNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartRoot"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Cart"
        component={ShoppingCartScreen}
        options={cartScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
