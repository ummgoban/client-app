import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import HeaderTitle from '@/components/common/Appbar/HeaderTitle';
import {defaultOptions} from '@/components/common/Appbar/AppbarOptions';

import ShoppingCartScreen from '@/screens/ShoppingCartScreen';

import {CartStackParamList} from '@/types/StackNavigationType';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createStackNavigator<CartStackParamList>();

const cartScreenOptions: StackNavigationOptions = {
  ...defaultOptions,
  headerTitle: () => <HeaderTitle title="장바구니" />,
};

const CartNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{flex: 1, paddingBottom: insets.bottom, backgroundColor: 'white'}}>
      <Stack.Navigator
        initialRouteName="CartRoot"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Cart"
          component={ShoppingCartScreen}
          options={cartScreenOptions}
        />
      </Stack.Navigator>
    </View>
  );
};

export default CartNavigator;
