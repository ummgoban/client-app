import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/register/SignupScreen';
import LoginScreen from '../screens/register/LoginScreen';
import {RegisterStackParamList} from '../types/StackNavigationType';

const Stack = createStackNavigator<RegisterStackParamList>();

const RegisterNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};

export default RegisterNavigator;
