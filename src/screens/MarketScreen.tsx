import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
<<<<<<< HEAD
import {DetailStackParamList} from '../types/StackNavigationType';

type Props = StackScreenProps<DetailStackParamList, 'Market'>;

const MarketScreen = ({route}: Props) => {
=======
import {Button} from 'react-native-paper';
import {DetailStackParamList} from '@/types/StackNavigationType';

type Props = StackScreenProps<DetailStackParamList, 'Market'>;

const MarketScreen = ({navigation, route}: Props) => {
>>>>>>> main
  const {marketId} = route.params;
  return (
    <View>
      <Text>MarketeScreen </Text>
      <Text>MarketId: {marketId}</Text>
<<<<<<< HEAD
=======
      {/* TODO: remove test button */}
      <Button
        onPress={() => navigation.navigate('Detail', {screen: 'Payment'})}>
        Go to payment
      </Button>
>>>>>>> main
    </View>
  );
};

export default MarketScreen;
