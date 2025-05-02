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
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ReviewCreateScreen from '@/screens/ReviewCreateScreen';
import MarketReviewScreen from '@/screens/MarketReviewScreen';

const Stack = createStackNavigator<DetailStackParamList>();

const screenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTintColor: theme.colors.dark,
  headerRight: () => <CartIcon />,
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
        screenOptions={screenOptions}>
        <Stack.Screen name="MarketDetail" component={MarketDetailScreen} />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            headerTitle: () => <HeaderTitle title="예약하기" />,
          }}
        />
        <Stack.Screen
          name="OrderDone"
          component={OrderDoneScreen}
          options={{
            headerTitle: () => <HeaderTitle title="주문 완료" />,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetailScreen}
          options={{
            headerTitle: () => <HeaderTitle title="주문내역" />,
          }}
        />
        <Stack.Screen
          name="ReviewCreate"
          component={ReviewCreateScreen}
          options={{
            headerTitle: () => <HeaderTitle title="리뷰 작성" />,
          }}
        />
        <Stack.Screen
          name="MarketReview"
          component={MarketReviewScreen}
          options={{
            headerTitle: () => <HeaderTitle title="리뷰" />,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default DetailNavigator;
