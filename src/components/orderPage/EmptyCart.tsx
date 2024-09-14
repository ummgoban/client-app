import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

type Props = {
  onPress: () => void;
};

const EmptyCart = ({onPress}: Props) => {
  return (
    <View>
      <Text>장바구니가 비어있습니다.</Text>
      <Button onPress={onPress}>상품 추가하기</Button>
    </View>
  );
};

export default EmptyCart;
