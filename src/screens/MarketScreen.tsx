import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {DetailStackParamList} from '../types/StackNavigationType';

type Props = StackScreenProps<DetailStackParamList, 'Market'>;

const MarketScreen = ({route}: Props) => {
  const {marketId} = route.params;
  return (
    <View>
      <Text>MarketeScreen </Text>
      <Text>MarketId: {marketId}</Text>
    </View>
  );
};

export default MarketScreen;
