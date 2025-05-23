import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import MyPageScreen from '@/screens/MyPageScreen';
import SettingScreen from '@/screens/SettingScreen';
import CustomerReviewScreen from '@/screens/CustomerReviewScreen';
import NicknamePatchPage from '@/screens/MyPageScreen/NicknamePatchPage';

import {MyPageStackParamList} from '@/types/StackNavigationType';
import theme from '@/context/theme';

const Stack = createStackNavigator<MyPageStackParamList>();

const myPageScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTintColor: theme.colors.dark,
};

const myPageOptions: StackNavigationOptions = {
  ...myPageScreenOptions,
  headerTitle: () => <HeaderTitle title="마이페이지" />,
};

const settingOptions: StackNavigationOptions = {
  ...myPageScreenOptions,
  headerTitle: () => <HeaderTitle title="설정" />,
};

const customerReviewOptions: StackNavigationOptions = {
  ...myPageScreenOptions,
  headerTitle: () => <HeaderTitle title="내 리뷰 조회" />,
};

const nicknameOptions: StackNavigationOptions = {
  ...myPageScreenOptions,
  headerTitle: () => <HeaderTitle title="닉네임 변경" />,
};

const MyPageNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPageRoot"
      screenOptions={myPageScreenOptions}>
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={myPageOptions}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={settingOptions}
      />
      <Stack.Screen
        name="CustomerReview"
        component={CustomerReviewScreen}
        options={customerReviewOptions}
      />
      <Stack.Screen
        name="Nickname"
        component={NicknamePatchPage}
        options={nicknameOptions}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
