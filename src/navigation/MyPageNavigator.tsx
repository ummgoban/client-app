import MyPageScreen from '@/screens/MyPageScreen';
import SettingScreen from '@/screens/SettingScreen';
import {MyPageStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

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
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
