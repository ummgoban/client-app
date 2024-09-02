import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {HomeStackParamList} from '../types/StackParamList';

type Props = StackScreenProps<HomeStackParamList, 'MyPage'>;

const MyPageScreen = ({}: Props) => {
  return (
    <View>
      <Text>MyPage Screen</Text>
    </View>
  );
};

export default MyPageScreen;
