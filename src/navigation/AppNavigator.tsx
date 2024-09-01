import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';
import {RootStackParamList} from '../types/RootStackParamList';
import DetailScreen from '../screens/DetailScreen';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
