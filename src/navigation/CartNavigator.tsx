import ShoppingCartScreen from '@/screens/ShoppingCart';

import {CartStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<CartStackParamList>();

const CartNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartRoot"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="Cart" component={ShoppingCartScreen} />
    </Stack.Navigator>
  );
};

export default CartNavigator;
