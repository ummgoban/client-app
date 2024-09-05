import React from 'react';
import {Alert} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

const ExampleButton = () => {
  const theme = useTheme();

  const onPress = () => Alert.alert('Button clicked!');

  return (
    <Button textColor={theme.colors.primary} onPress={onPress}>
      Click me
    </Button>
  );
};

export default ExampleButton;
