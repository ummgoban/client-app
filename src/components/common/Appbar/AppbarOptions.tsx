import {StackNavigationOptions} from '@react-navigation/stack';

import {BackIcon} from './BackIcon';

export const defaultOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left' as const,
  headerBackTitleVisible: false,
  headerLeft: BackIcon,
};
