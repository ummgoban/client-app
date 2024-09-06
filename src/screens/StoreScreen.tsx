import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {DetailStackParamList} from '../types/StackNavigationType';

type Props = StackScreenProps<DetailStackParamList, 'Store'>;

const StoreScreen = ({route}: Props) => {
  const {storeId} = route.params;
  return (
    <View>
      <Text>StoreScreen Screen</Text>
      <Text>storeId ID: {storeId}</Text>
    </View>
  );
};

export default StoreScreen;