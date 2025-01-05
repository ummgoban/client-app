import CartIcon from '@/components/common/CartNavigatorIcon';
import MomChanPickLogo from '@/components/common/MomChanPickLogo';
import SettingsIcon from '@/components/common/SettingsNavigatorIcon';
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
import SubscribeScreen from '@/screens/SubscribeScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import {TabBar} from '@components/common';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/FeedScreen';
import MyPageScreen from '@screens/MyPageScreen';
import React from 'react';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const defaultScreenOptions = () => ({
  headerShown: true,
  headerRight: () => <CartIcon />,
  headerTitleAlign: 'center' as const,
});

const feedScreenOptions = () => ({
  ...defaultScreenOptions(),
  headerLeft: () => <MomChanPickLogo />,
  title: '주변 가게',
});

const myPageScreenOptions = () => ({
  ...defaultScreenOptions(),
  headerRight: () => <SettingsIcon />,
  title: '마이페이지',
});

const HomeNavigator = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Feed"
        options={feedScreenOptions}
        component={HomeScreen}
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
