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

const Stack = createStackNavigator<MyPageStackParamList>();

const myPageScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="마이페이지" />,
};

const settingScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="설정" />,
};

const customerReviewScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="내 리뷰 조회" />,
};

const NicknameScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="닉네임 변경" />,
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
        name={'CustomerReview'}
        component={CustomerReviewScreen}
        options={customerReviewScreenOptions}
      />
      <Stack.Screen
        name={'Nickname'}
        component={NicknamePatchPage}
        options={NicknameScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
