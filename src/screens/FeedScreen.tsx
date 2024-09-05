import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/StackNavigationType';
import ExampleButton from '../components/ExampleButton';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const FeedScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Welcome to the Feed Screen!</Text>
      <ExampleButton />
      <Button
        title="Go to MyPage Screen"
        onPress={() => navigation.navigate('Home', {screen: 'MyPage'})}
      />
      <Button
        title="Go to Detail Screen"
        onPress={() =>
          navigation.navigate('Detail', {
            screen: 'Store',
            params: {storeId: 100},
          })
        }
      />
    </View>
  );
};

export default FeedScreen;
