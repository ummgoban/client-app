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
        name="CustomerReview"
        component={CustomerReviewScreen}
        options={customerReviewScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
