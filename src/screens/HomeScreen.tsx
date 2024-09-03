import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/StackNavigationType';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Register', {screen: 'Login'})}
      />
      <Button
        title="Go to MyPage Screen"
        onPress={() => navigation.navigate('Home', {screen: 'MyPage'})}
      />
      <Button
        title="Go to Detail Screen"
        onPress={() =>
          navigation.navigate('Home', {screen: 'Detail', params: {itemId: 100}})
        }
      />
    </View>
  );
};

export default HomeScreen;
