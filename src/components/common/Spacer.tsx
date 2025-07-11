import React from 'react';
import {View} from 'react-native';

const Spacer = ({
  size = 16,
  direction = 'vertical',
}: {
  size?: number;
  direction?: 'vertical' | 'horizontal';
}) => {
  return (
    <View
      style={direction === 'vertical' ? {marginTop: size} : {marginLeft: size}}
    />
  );
};

export default Spacer;
