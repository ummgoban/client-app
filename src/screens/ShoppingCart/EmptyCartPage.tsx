// EmptyCartPage.tsx
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import S from './EmptyCartPage.style.tsx';
type Props = {
  onPress: () => void;
};

const EmptyCartPage = ({onPress}: Props) => {
  return (
    <S.EmptyCartContainer>
      <Text>장바구니가 비어있어요.</Text>
      <TouchableOpacity onPress={onPress}>
        <S.GoShoppingText>쇼핑하러 가기</S.GoShoppingText>
      </TouchableOpacity>
    </S.EmptyCartContainer>
  );
};

export default EmptyCartPage;
