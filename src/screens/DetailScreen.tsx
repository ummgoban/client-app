import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {HomeStackParamList} from '../types/StackParamList';

type Props = StackScreenProps<HomeStackParamList, 'Detail'>;

const DetailScreen = ({route}: Props) => {
  const {itemId} = route.params;
  return (
    <View>
      <Text>DetailScreen Screen</Text>
      <Text>itemId ID: {itemId}</Text>
    </View>
  );
};

export default DetailScreen;
