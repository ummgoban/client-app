import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import {
  HomeStackParamList,
  RootStackParamList,
} from '../types/StackNavigationType';

type Props = StackScreenProps<
  HomeStackParamList & RootStackParamList,
  'MyPage'
>;

const MyPageScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>MyPage Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
      />
    </View>
  );
};

export default MyPageScreen;
