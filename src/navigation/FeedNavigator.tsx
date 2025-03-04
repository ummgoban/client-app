import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import HeaderTitle from '@/components/common/HeaderTitle';
import CartIcon from '@/components/common/CartNavigatorIcon';

import MapScreen from '@/screens/MapScreen';
import FeedScreen from '@/screens/FeedScreen';

import {FeedStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<FeedStackParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: true,
  headerRight: () => <CartIcon />,
  headerTitleAlign: 'left' as const,
  headerTitle: () => <HeaderTitle />,
};

const mapScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerLeft: () => null,
};

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Market"
      screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Market"
        options={screenOptions}
        component={FeedScreen}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={mapScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
