import React from 'react';
import HomeScreen from '../screens/FeedScreen';
import MyPageScreen from '../screens/MyPageScreen';
import {HomeStackParamList} from '../types/StackNavigationType';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Create a stack navigator
const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
