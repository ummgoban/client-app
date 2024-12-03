import ShoppingCartScreen from '@/screens/ShoppingCartScreen';

import {CartStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<CartStackParamList>();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartRoot"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Cart"
        component={ShoppingCartScreen}
        options={{
          title: '장바구니',
        }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
