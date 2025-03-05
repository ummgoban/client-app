import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';

import LoginScreen from '@screens/RegisterScreen/LoginScreen';
import SignupScreen from '@screens/RegisterScreen/SignupScreen';

import {RegisterStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<RegisterStackParamList>();

const loginScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="로그인" />,
};

const signupScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="회원가입" />,
};

const RegisterNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={loginScreenOptions}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={signupScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
