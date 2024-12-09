import MarketDetailScreen from '@/screens/MarketDetailScreen';
import OrderDoneScreen from '@/screens/OrderDoneScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CartIcon from '@/components/common/CartNavigatorIcon';
import MapScreen from '@/screens/MapScreen';

const Stack = createStackNavigator<DetailStackParamList>();

const screenOptions = {
  headerShown: true,
  headerRight: () => <CartIcon />,
  headerTitleAlign: 'center' as const,
};

const DetailNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Market"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Market"
        options={screenOptions}
        component={MarketDetailScreen}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: '주변 가게',
        }}
      />
      {/* <Stack.Screen name="Order" component={OrderScreen} /> */}
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          title: '예약하기',
        }}
      />
      <Stack.Screen
        name="OrderDone"
        component={OrderDoneScreen}
        options={{
          title: '주문 완료',
        }}
      />
    </Stack.Navigator>
  );
};

export default DetailNavigator;
