import React from 'react';
import {Text} from 'react-native';
import S from './EmptyCartPage.style.tsx';
type Props = {
  onPress: () => void;
};

const EmptyCartPage = ({onPress}: Props) => {
  return (
    // TODO: 디자인 적용
    <S.EmptyCartContainer>
      <Text>장바구니가 비어있어요.</Text>
      <S.GoShoppingButton onPress={onPress}>
        <S.GoShoppingText>쇼핑하러 가기</S.GoShoppingText>
      </S.GoShoppingButton>
    </S.EmptyCartContainer>
  );
};

export default EmptyCartPage;
