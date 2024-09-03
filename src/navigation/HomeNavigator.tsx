import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import TabBar from '../components/common/TabBar';
import HomeScreen from '../screens/FeedScreen';
import MyPageScreen from '../screens/MyPageScreen';
import {HomeStackParamList} from '../types/StackNavigationType';
import {Text} from 'react-native';

type TabBarComponentType = {
  [route in keyof HomeStackParamList]: {
    name: string;
    icon: string;
  };
};

const tabBarData: TabBarComponentType = {
  Feed: {
    name: '홈',
    icon: 'feed_icon.png',
  },
  MyPage: {
    name: '마이 페이지',
    icon: 'mypage_icon.png',
  },
};

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        tabBarIcon: () => {
          // TODO: render image icon
          // declare and implement image icon component (component/common/Icon.tsx)
          return <Text>{tabBarData[route.name].icon}</Text>;
        },
        tabBarLabel: tabBarData[route.name].name,
      })}
      tabBar={TabBar}>
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
      {/* Add more screens here */}
    </Tab.Navigator>
  );
};

export default HomeNavigator;
