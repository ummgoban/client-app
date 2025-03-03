import CartIcon from '@/components/common/CartNavigatorIcon';
import HeaderTitle from '@/components/common/HeaderTitle';
import SettingsIcon from '@/components/common/SettingsNavigatorIcon';
import FeedScreen from '@/screens/FeedScreen';
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
import SubscribeScreen from '@/screens/SubscribeScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import MyPageScreen from '@screens/MyPageScreen';
import React from 'react';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const defaultScreenOptions = () => ({
  headerShown: true,
  headerRight: () => <CartIcon />,
  headerTitleAlign: 'left' as const,
});

const feedScreenOptions = () => ({
  ...defaultScreenOptions(),
  headerTitle: () => <HeaderTitle />,
});

const myPageScreenOptions = () => ({
  ...defaultScreenOptions(),
  headerRight: () => <SettingsIcon />,
  title: '마이페이지',
});

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const HomeNavigator = () => {
  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen
        name="Feed"
        options={{...feedScreenOptions()}}
        component={FeedScreen}
      />
      <Tab.Screen
        name="Subscribe"
        options={{...defaultScreenOptions(), title: '찜한 가게'}}
        component={SubscribeScreen}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{...defaultScreenOptions(), title: '주문 내역'}}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={myPageScreenOptions}
      />

      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
