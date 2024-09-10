import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabBar} from '@components/common';
import HomeScreen from '@screens/FeedScreen';
import MyPageScreen from '@screens/MyPageScreen';
import {HomeStackParamList} from '@/types/StackNavigationType';

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true}} tabBar={TabBar}>
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
