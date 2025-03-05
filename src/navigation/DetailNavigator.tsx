import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import CartIcon from '@/components/common/CartNavigatorIcon';

import MarketDetailScreen from '@/screens/MarketDetailScreen';
import OrderDetailScreen from '@/screens/OrderDetailScreen';
import OrderDoneScreen from '@/screens/OrderDoneScreen';
import PaymentScreen from '@/screens/PaymentScreen';

import {DetailStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<DetailStackParamList>();

const screenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerRight: () => <CartIcon />,
};

const paymentScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="예약하기" />,
};

const orderDetailScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="주문내역" />,
};

const orderDoneScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="주문 완료" />,
  headerLeft: () => null,
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
        options={paymentScreenOptions}
      />
      <Stack.Screen
        name="OrderDone"
        component={OrderDoneScreen}
        options={orderDoneScreenOptions}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={orderDetailScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default DetailNavigator;
