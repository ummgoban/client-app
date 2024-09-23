import React, {useEffect, useState} from 'react';
import {ProductType} from '@/types/ProductType';
import S from './Menu.style';

//TODO: 픽업 시작 만료까지 남은 시간 구체화해서 표현 (S.MenuTimeText)
type CartItem = {
  productId: number;
  productName: string;
  count: number;
};

type Props = {
  product: ProductType;
  cart: CartItem[];
  onCountChange: (
    productId: number,
    productName: string,
    count: number,
  ) => void;
};

const Menu = ({product, cart, onCountChange}: Props) => {
  const [menuCount, setMenuCount] = useState(0);

  useEffect(() => {
    const cartItem = cart.find(item => item.productId === product.id);
    if (cartItem) {
      setMenuCount(cartItem.count);
    } else {
      setMenuCount(0);
    }
  }, [cart, product.id]);

  const increaseMenuCount = () => {
    setMenuCount(prevCount => {
      const newCount = prevCount + 1;
      onCountChange(product.id, product.name, newCount);
      return newCount;
    });
  };

  const decreaseMenuCount = () => {
    setMenuCount(prevCount => {
      const newCount = Math.max(prevCount - 1, 0);
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
