import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {ProductType} from '@/types/ProductType';
import S from './Menu.style';
type Props = {
  product: ProductType;
  initCount: number;
  onCountChange: (productId: number, count: number) => void;
  isCart?: boolean;
};

const Menu = ({product, initCount, onCountChange, isCart}: Props) => {
  const [menuCount, setMenuCount] = useState(initCount);

  useEffect(() => {
    setMenuCount(initCount);
  }, [initCount]);

  //TODO: 갯수 증가, 차감시 api 호출
  const increaseMenuCount = () => {
    setMenuCount(prevCount => {
      const newCount = prevCount + 1;
      onCountChange(product.id, newCount);
      return newCount;
    });
  };

  const decreaseMenuCount = () => {
    setMenuCount(prevCount => {
      const minCount = isCart ? 1 : 0;
      const newCount = Math.max(prevCount - 1, minCount);
      onCountChange(product.id, newCount);
      return newCount;
    });
  };

  const deleteMenu = () => {
    Alert.alert(
      '메뉴 삭제',
      '메뉴를 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            setMenuCount(0);
            onCountChange(product.id, 0);
          },
        },
        {
          text: '아니오',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  const isDecrease = isCart && menuCount === 1;

  return (
    <S.MenuWrapper>
      <S.MenuBoxLeft>
        <S.MenuName>{product.name}</S.MenuName>
        <S.MenuOriginalPrice>
          {/* TODO: 타입 수정 */}
          {/* 정가: {product.originalPrice.toLocaleString()}원 */}
        </S.MenuOriginalPrice>
        <S.MenuDiscountPrice>
          {/* 할인가: {product.discountPrice.toLocaleString()}원 */}
        </S.MenuDiscountPrice>
        {/* TODO: API연결 후 재고 값 넣기 */}
        <S.MenuStockCount>재고: 1</S.MenuStockCount>
        {isCart && (
          <S.MenuDeleteButtonWrapper onPress={deleteMenu}>
            <S.MenuDeleteText>메뉴 삭제</S.MenuDeleteText>
          </S.MenuDeleteButtonWrapper>
        )}
      </S.MenuBoxLeft>
      <S.MenuBoxRight>
        <S.MenuImage source={{uri: product.image}} />
        <S.MenuCounter>
          {/* TODO: 디자인 적용시 disabled 명시 필요 */}
          <S.MenuCounterButtonWrapper
            disabled={isDecrease}
            onPress={decreaseMenuCount}>
            <S.MenuCounterSideButton>-</S.MenuCounterSideButton>
          </S.MenuCounterButtonWrapper>
          <S.MenuCounterButton>{menuCount} 개</S.MenuCounterButton>
          <S.MenuCounterButtonWrapper onPress={increaseMenuCount}>
            <S.MenuCounterSideButton>+</S.MenuCounterSideButton>
          </S.MenuCounterButtonWrapper>
        </S.MenuCounter>
      </S.MenuBoxRight>
    </S.MenuWrapper>
  );
};
export default Menu;
