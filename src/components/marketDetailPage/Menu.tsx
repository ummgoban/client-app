import React, {useState, useEffect} from 'react';
import {ProductType} from '@/types/ProductType';
import S from './Menu.style';

type Props = {
  product: ProductType;
  initCount: number;
  onCountChange: (productId: number, count: number) => void;
};

const Menu = ({product, initCount, onCountChange}: Props) => {
  const [menuCount, setMenuCount] = useState(initCount);

  useEffect(() => {
    setMenuCount(initCount);
  }, [initCount]);

  const increaseMenuCount = () => {
    setMenuCount(prevCount => {
      const newCount = prevCount + 1;
      onCountChange(product.id, newCount);
      return newCount;
    });
  };

  const decreaseMenuCount = () => {
    setMenuCount(prevCount => {
      const newCount = Math.max(prevCount - 1, 0);
      onCountChange(product.id, newCount);
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
        <S.MenuCounter>
          <S.MenuCounterButtonWrapper onPress={decreaseMenuCount}>
            <S.MenuCounterButton>-</S.MenuCounterButton>
          </S.MenuCounterButtonWrapper>
          <S.MenuCounterButton>{menuCount} 개</S.MenuCounterButton>
          <S.MenuCounterButtonWrapper onPress={increaseMenuCount}>
            <S.MenuCounterButton>+</S.MenuCounterButton>
          </S.MenuCounterButtonWrapper>
        </S.MenuCounter>
      </S.MenuBoxRight>
    </S.MenuWrapper>
  );
};
export default Menu;
