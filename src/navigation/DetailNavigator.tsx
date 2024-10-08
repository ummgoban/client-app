import MarketDetailScreen from '@/screens/MarketDetailScreen';
import OrderDoneScreen from '@/screens/OrderDoneScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<DetailStackParamList>();

const DetailNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Market"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="Market" component={MarketDetailScreen} />
      {/* <Stack.Screen name="Order" component={OrderScreen} /> */}
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderDone" component={OrderDoneScreen} />
    </Stack.Navigator>
  );
};

export default DetailNavigator;
