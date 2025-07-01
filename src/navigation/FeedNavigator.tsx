import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';

import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import CartIcon from '@/components/common/CartNavigatorIcon';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';

import MapScreen from '@/screens/MapScreen';
import FeedScreen from '@/screens/FeedScreen';

import {FeedStackParamList} from '@/types/StackNavigationType';
import theme from '@/context/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createStackNavigator<FeedStackParamList>();

const screenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerRight: () => <CartIcon />,
  headerTitle: () => <HeaderTitle title="내 주변" />,
  headerTintColor: theme.colors.dark,
};

const mapScreenOptions: StackNavigationOptions = {
  ...screenOptions,
  headerLeft: () => null,
};

const FeedNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      // TODO: lint warning fix
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        paddingBottom: insets.bottom - 8,
        backgroundColor: 'white',
      }}>
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
    </View>
  );
};

export default FeedNavigator;
