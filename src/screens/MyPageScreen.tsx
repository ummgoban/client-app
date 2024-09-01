import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../types/RootStackParamList';

type Props = StackScreenProps<RootStackParamList, 'MyPage'>;

const MyPageScreen = ({route}: Props) => {
  const {userId} = route.params;
  return (
    <View>
      <Text>MyPage Screen</Text>
      <Text>User ID: {userId}</Text>
    </View>
  );
};

export default MyPageScreen;
