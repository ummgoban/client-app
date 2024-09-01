import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const goToDetailScreen = () => {
    navigation.navigate('Profile', {userId: '123'});
  };

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Go to Detail Screen" onPress={goToDetailScreen} />
    </View>
  );
};

export default HomeScreen;
