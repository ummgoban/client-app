import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import MyPageScreen from '@/screens/MyPageScreen';
import NoticePage from '@/screens/MyPageScreen/NoticePage';
import PolicyPage from '@/screens/MyPageScreen/PolicyPage';
import SettingScreen from '@/screens/SettingScreen';

import {MyPageStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<MyPageStackParamList>();

const myPageScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="마이페이지" />,
};

const noticePageOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="공지사항" />,
};

const policyPageOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="약관 및 정책" />,
};

const settingScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="설정" />,
};

const MyPageNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPageRoot"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={myPageScreenOptions}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={settingScreenOptions}
      />
      <Stack.Screen
        name={'Notice'}
        component={NoticePage}
        options={noticePageOptions}
      />
      <Stack.Screen
        name={'Policy'}
        component={PolicyPage}
        options={policyPageOptions}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
