import React from 'react';
import {BottomButton} from '@/components/common';
import CustomActivityIndicator from '@/components/common/ActivityIndicator';
import {CartItem} from '../hooks/useCart';

type CartButtonProps = {
  isMarketClosed: boolean;
  isCartPending: boolean;
  cart: CartItem[];
  profile: any;
  onPress: () => void;
};

const CartButton = ({
  isMarketClosed,
  isCartPending,
  cart,
  profile,
  onPress,
}: CartButtonProps) => {
  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isMarketClosed) {
      return '영업이 종료되었어요.';
    }

    if (!profile) {
      return '로그인하고 장바구니에 담기';
    }

    if (isCartPending) {
      return '잠시 기다려주세요.';
    }

    return `예약하기 (${cart.length})`;
  };

  return (
    <>
      <BottomButton
        disabled={isMarketClosed || isCartPending}
        onPress={onPress}>
        {getButtonText()}
      </BottomButton>

      {isCartPending && <CustomActivityIndicator />}
    </>
  );
};

export default CartButton;
