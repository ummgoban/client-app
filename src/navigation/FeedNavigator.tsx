import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import CartIcon from '@/components/common/CartNavigatorIcon';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';

import MapScreen from '@/screens/MapScreen';
import FeedScreen from '@/screens/FeedScreen';

import {FeedStackParamList} from '@/types/StackNavigationType';

const Stack = createStackNavigator<FeedStackParamList>();

const screenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerRight: () => <CartIcon />,
  headerTitle: () => <HeaderTitle title="내 주변" />,
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
