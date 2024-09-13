import {ProductType} from '@/types/ProductType';
import React from 'react';
import S from './Menu.style';
import {useState} from 'react';
type Props = {
  product: ProductType;
  onCountChange: (
    productId: number,
    productName: string,
    count: number,
  ) => void;
};
const Menu = ({product, onCountChange}: Props) => {
  const [menuCount, setMenuCount] = useState(0);

  const menuCountButtonAdder = () => {
    setMenuCount(prevCount => {
      const newCount = prevCount + 1;
      onCountChange(product.id, product.name, newCount);
      return newCount;
    });
  };

  const menuCountButtonReducer = () => {
    setMenuCount(prevCount => {
      const newCount = prevCount - 1;
      if (newCount < 0) {
        setMenuCount(0);
        return 0;
      }
      onCountChange(product.id, product.name, newCount);
      return newCount;
    });
  };

  return (
    <S.MenuWrapper>
      <S.MenuBoxLeft>
        <S.MenuName>{product.name}</S.MenuName>
        <S.MenuOriginalPrice>
          정가: {product.originalPrice.toLocaleString()}원
        </S.MenuOriginalPrice>
        <S.MenuDiscountPrice>
          할인가: {product.discountPrice.toLocaleString()}원
        </S.MenuDiscountPrice>
      </S.MenuBoxLeft>
      <S.MenuBoxRight>
        <S.MenuImage source={{uri: product.image}} />
        <S.MenuTimeText>예약 마감 2시간 13분 전</S.MenuTimeText>
        <S.MenuCounter>
          <S.MenuCounterButtonWrapper onPress={menuCountButtonReducer}>
            <S.MenuCounterButton>-</S.MenuCounterButton>
          </S.MenuCounterButtonWrapper>
          <S.MenuCounterButton>{menuCount} 개</S.MenuCounterButton>
          <S.MenuCounterButtonWrapper onPress={menuCountButtonAdder}>
            <S.MenuCounterButton>-</S.MenuCounterButton>
          </S.MenuCounterButtonWrapper>
          <S.MenuCounterButton>0개</S.MenuCounterButton>
          <S.MenuCounterButtonWrapper>
            <S.MenuCounterButton>+</S.MenuCounterButton>
          </S.MenuCounterButtonWrapper>
        </S.MenuCounter>
      </S.MenuBoxRight>
    </S.MenuWrapper>
  );
};
export default Menu;
