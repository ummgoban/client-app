import React from 'react';
import {RootStackParamList} from '../types/StackNavigationType';
import HomeNavigator from './HomeNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterNavigator from './RegisterNavigator';
import DetailNavigator from './DetailNavigator';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Register" component={RegisterNavigator} />
      <Stack.Screen name="Detail" component={DetailNavigator} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
