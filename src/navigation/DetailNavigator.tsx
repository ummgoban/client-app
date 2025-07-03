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
import theme from '@/context/theme';
import ReviewCreateScreen from '@/screens/ReviewCreateScreen';
import MarketReviewScreen from '@/screens/MarketReviewScreen';

const Stack = createStackNavigator<DetailStackParamList>();

const screenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTintColor: theme.colors.dark,
  headerRight: () => <CartIcon />,
};

const paymentScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="예약하기" />,
};

const orderDoneScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="주문 완료" />,
  headerLeft: () => null,
};

const orderDetailScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="주문내역" />,
};

const reviewCreateScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="리뷰 작성" />,
};

const marketReviewScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerTitle: () => <HeaderTitle title="리뷰" />,
};

const DetailNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MarketDetail"
      screenOptions={screenOptions}>
      <Stack.Screen name="MarketDetail" component={MarketDetailScreen} />
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
        name="ReviewCreate"
        component={ReviewCreateScreen}
        options={reviewCreateScreenOptions}
      />
      <Stack.Screen
        name="MarketReview"
        component={MarketReviewScreen}
        options={marketReviewScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default DetailNavigator;
