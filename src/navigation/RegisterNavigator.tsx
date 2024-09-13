import {RegisterStackParamList} from '@/types/StackNavigationType';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@screens/RegisterScreen/LoginScreen';
import SignupScreen from '@screens/RegisterScreen/SignupScreen';
import React from 'react';

const Stack = createStackNavigator<RegisterStackParamList>();

const RegisterNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
