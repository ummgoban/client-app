import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../../types/StackNavigationType';
import {Text, View} from 'react-native';
import {DetailStackParamList} from '../../types/StackNavigationType';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Cart'>;
};

const ShoppingCartScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>MarketeScreen </Text>
    </View>
  );
};

export default ShoppingCartScreen;
