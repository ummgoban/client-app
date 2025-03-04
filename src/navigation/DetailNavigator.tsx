import CartIcon from '@/components/common/CartNavigatorIcon';
import MarketDetailScreen from '@/screens/MarketDetailScreen';
import OrderDetailScreen from '@/screens/OrderDetailScreen';
import OrderDoneScreen from '@/screens/OrderDoneScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import {DetailStackParamList} from '@/types/StackNavigationType';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator<DetailStackParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: true,
  headerRight: () => <CartIcon />,
  headerTitleAlign: 'center' as const,
};

const DetailNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MarketDetail"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="MarketDetail"
        options={screenOptions}
        component={MarketDetailScreen}
      />
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
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{
          title: '주문 상세',
        }}
      />
    </Stack.Navigator>
  );
};

export default DetailNavigator;
