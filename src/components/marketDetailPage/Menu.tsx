import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';

import {useDeleteFromBucket} from '@/apis/buckets';

import CustomImageModal from '@/components/common/CustomImageModal';

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

  const {mutateAsync: deleteFromBucket} = useDeleteFromBucket();

  useEffect(() => {
    setMenuCount(initCount);
  }, [initCount]);

  const increaseMenuCount = async () => {
    setMenuCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount > product.stock) {
        return prevCount;
      }
      onCountChange(product.id, isCart ? 1 : newCount);
      return newCount;
    });
  };

  const decreaseMenuCount = async () => {
    setMenuCount(prevCount => {
      const minCount = isCart ? 1 : 0;
      const newCount = Math.max(prevCount - 1, minCount);
      onCountChange(product.id, isCart ? -1 : newCount);
      return newCount;
    });
  };

  const deleteMenu = async () => {
    const handleDelete = async () => {
      try {
        await deleteFromBucket(product.id);
        onCountChange(product.id, 0);
      } catch (error) {
        console.debug('메뉴 삭제 중 에러 발생', error);
      }
    };
    Alert.alert(
      '메뉴 삭제',
      '메뉴를 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            handleDelete();
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

  const isDecrease = (isCart && menuCount === 1) || menuCount === 0;

  return (
    <S.MenuWrapper>
      <S.MenuBoxLeft>
        <S.MenuName>{product.name}</S.MenuName>
        {product.originPrice !== product.discountPrice ? (
          <S.MenuInfoWrapper>
            <S.MenuoriginPrice>
              {`정가: ${product.originPrice.toLocaleString()}원`}
            </S.MenuoriginPrice>
            <S.MenuDiscountPrice>
              {`할인가: ${product.discountPrice.toLocaleString()}원`}
            </S.MenuDiscountPrice>
          </S.MenuInfoWrapper>
        ) : (
          <S.MenuDiscountPrice>
            {`정가: ${product.originPrice.toLocaleString()}원`}
          </S.MenuDiscountPrice>
        )}
        <S.MenuStockWrapper>
          {product.stock > 0 ? (
            <S.MenuStockCount>{`재고 : ${product.stock}`} </S.MenuStockCount>
          ) : (
            <S.MenuSoldOutText>{`현재 재고가 없어요`}</S.MenuSoldOutText>
          )}

          <S.MenuStockCount>{`${!isCart ? '' : `수량: ${product.count}`}`}</S.MenuStockCount>
        </S.MenuStockWrapper>
        {isCart && (
          <S.MenuDeleteButtonWrapper onPress={deleteMenu}>
            <S.MenuDeleteText>메뉴 삭제</S.MenuDeleteText>
          </S.MenuDeleteButtonWrapper>
        )}
      </S.MenuBoxLeft>
      <S.MenuBoxRight>
        <S.ImageView>
          <CustomImageModal uri={product.image} borderRadius={18} />
        </S.ImageView>
        {product.stock > 0 ? (
          <S.MenuCounter>
            <S.MenuCounterButtonWrapper
              disabled={isDecrease}
              onPress={decreaseMenuCount}>
              <S.MenuCounterSideButton>-</S.MenuCounterSideButton>
            </S.MenuCounterButtonWrapper>
            <S.MenuCounterButton>{menuCount} 개</S.MenuCounterButton>
            <S.MenuCounterButtonWrapper
              onPress={increaseMenuCount}
              disabled={menuCount === product.stock}>
              <S.MenuCounterSideButton>+</S.MenuCounterSideButton>
            </S.MenuCounterButtonWrapper>
          </S.MenuCounter>
        ) : (
          <S.MenuCounter>
            <S.MenuCounterButtonWrapper
              disabled={isDecrease}
              onPress={decreaseMenuCount}>
              <S.MenuCounterSideButton>-</S.MenuCounterSideButton>
            </S.MenuCounterButtonWrapper>
            <S.MenuCounterButton>{`품절`}</S.MenuCounterButton>
            <S.MenuCounterButtonWrapper
              onPress={increaseMenuCount}
              disabled={menuCount === product.stock}>
              <S.MenuCounterSideButton>+</S.MenuCounterSideButton>
            </S.MenuCounterButtonWrapper>
          </S.MenuCounter>
        )}
      </S.MenuBoxRight>
    </S.MenuWrapper>
  );
};
export default Menu;
