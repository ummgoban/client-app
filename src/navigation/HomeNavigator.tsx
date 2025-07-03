import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import CartIcon from '@/components/common/CartNavigatorIcon';
import SettingsIcon from '@/components/common/SettingsNavigatorIcon';
import {TabBar} from '@components/common';

import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
import SubscribeScreen from '@/screens/SubscribeScreen';
import MyPageScreen from '@screens/MyPageScreen';

import FeedNavigator from './FeedNavigator';
import theme from '@/context/theme';

import {HomeStackParamList} from '@/types/StackNavigationType';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const defaultScreenOptions: BottomTabNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left' as const,
  headerRight: () => <CartIcon />,
  headerTintColor: theme.colors.dark,
};

const myPageScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerRight: () => <SettingsIcon />,
  headerTitle: () => <HeaderTitle title="마이페이지" />,
};

const subscribeScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="찜한 가게" />,
};

const orderHistoryScreenOptions: BottomTabNavigationOptions = {
  ...defaultScreenOptions,
  headerTitle: () => <HeaderTitle title="주문 내역" />,
};

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const HomeNavigator = () => {
  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Subscribe"
        options={subscribeScreenOptions}
        component={SubscribeScreen}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={orderHistoryScreenOptions}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={myPageScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
