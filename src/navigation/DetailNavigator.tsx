import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailStackParamList} from '../types/StackNavigationType';
import StoreScreen from '../screens/StoreScreen';

const Stack = createStackNavigator<DetailStackParamList>();

const DetailNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Store"
      screenOptions={{headerShown: true}}>
      <Stack.Screen name="Store" component={StoreScreen} />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
};

export default DetailNavigator;
