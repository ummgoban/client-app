import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabBar} from '@components/common';
import HomeScreen from '@screens/FeedScreen';
import MyPageScreen from '@screens/MyPageScreen';
import OrderHistoryScreen from '@/screens/OrderHistoryScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';
import CartIcon from '@/components/common/CartNavigatorIcon';
import SubscribeScreen from '@/screens/SubscribeScreen';
import MomChanPickLogo from '@/components/common/MomChanPickLogo';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const defaultScreenOptions = () => ({
  headerShown: true,
  headerRight: () => <CartIcon />,
  headerTitleAlign: 'center' as const,
});

const feedScreenOptions = () => ({
  ...defaultScreenOptions(),
  headerLeft: () => <MomChanPickLogo />,
});

const HomeNavigator = () => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen
        name="Feed"
        options={feedScreenOptions}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Subscribe"
        options={defaultScreenOptions}
        component={SubscribeScreen}
      />
      <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />

      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
