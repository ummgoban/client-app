import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailStackParamList} from '../types/StackNavigationType';
import StoreScreen from '../screens/StoreScreen';

const Stack = createStackNavigator<DetailStackParamList>();

const DetailNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Store"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="Store" component={StoreScreen} />
      {/* <Stack.Screen name="Order" component={OrderScreen} /> */}
      {/* <Stack.Screen name="Payment" component={PaymentScreen} /> */}
      {/* <Stack.Screen name="OrderDone" component={OrderDoneScreen} /> */}
    </Stack.Navigator>
  );
};

export default DetailNavigator;
