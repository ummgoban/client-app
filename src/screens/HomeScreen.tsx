import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IntegrationStackParamList} from '../types/StackParamList';

type Props = {
  navigation: StackNavigationProp<IntegrationStackParamList, 'Home'>;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Go to MyPage Screen"
        onPress={() => navigation.navigate('MyPage')}
      />
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate('Detail', {itemId: 100})}
      />
    </View>
  );
};

export default HomeScreen;
