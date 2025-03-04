import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import ShoppingCartScreen from '@/screens/ShoppingCartScreen';

import {CartStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<CartStackParamList>();

const cartScreenOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left' as const,
  headerTitle: () => <HeaderTitle title="장바구니" />,
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
