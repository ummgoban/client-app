import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

const NonMemberMyPage = ({onPress}: {onPress: () => void}) => {
  return (
    <View>
      <Button onPress={onPress}>Go to Login</Button>
    </View>
  );
};

export default NonMemberMyPage;
