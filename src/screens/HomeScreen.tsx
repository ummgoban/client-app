import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to MyPage Screen"
        onPress={() => navigation.navigate('MyPage', {userId: '123'})}
      />
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate('Detail', {itemId: 100})}
      />
    </View>
  );
};

export default HomeScreen;
