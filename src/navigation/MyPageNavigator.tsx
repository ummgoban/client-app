import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import MyPageScreen from '@/screens/MyPageScreen';
import NoticePage from '@/screens/MyPageScreen/NoticePage';
import PolicyPage from '@/screens/MyPageScreen/PolicyPage';
import SettingScreen from '@/screens/SettingScreen';

import {MyPageStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<MyPageStackParamList>();

const MyPageNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPageRoot"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          title: '마이페이지',
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: '설정',
        }}
      />
      <Stack.Screen
        name={'Notice'}
        component={NoticePage}
        options={{
          title: '공지사항',
        }}
      />
      <Stack.Screen
        name={'Policy'}
        component={PolicyPage}
        options={{
          title: '약관 및 정책',
        }}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
