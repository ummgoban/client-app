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
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ReviewScreen from '@/screens/ReviewScreen';

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

const reviewScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="리뷰 작성" />,
};

const DetailNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      // TODO: lint warning fix
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1, paddingBottom: insets.bottom, backgroundColor: 'white'}}>
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
        <Stack.Screen
          name="Review"
          component={ReviewScreen}
          options={reviewScreenOptions}
        />
      </Stack.Navigator>
    </View>
  );
};

export default DetailNavigator;
