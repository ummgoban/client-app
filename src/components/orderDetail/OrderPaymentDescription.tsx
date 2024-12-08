import React from 'react';
import {ProductType} from '@/types/ProductType';
import S from './OrderPaymentDescription.style';

type Props = {
  products: ProductType[];
  totalPrice: number;
  paymentMethod: string;
};

const OrderProductsInfo = ({products, totalPrice, paymentMethod}: Props) => {
  const getPaymentMethodText = (method: string): string => {
    switch (method) {
      case 'CARD':
        return '카드';
      case 'VIRTUAL_ACCOUNT':
        return '가상계좌';
      case 'MOBILE_PHONE':
        return '휴대폰';
      case 'CULTURE_GIFT_CERTIFICATE':
        return '문화상품권';
      case 'BOOK_CULTURE_GIFT_CERTIFICATE':
        return '도서문화상품권';
      case 'GAME_CULTE_GIFT_CERTIFICATE':
        return '게임문화상품권';
      case 'TRANSFER':
        return '계좌이체';
      case 'EASYPAY':
        return '간편결제';
      case 'PICKUP':
        return '만나서 결제';
      default:
        return '알 수 없는 결제수단';
    }
  };

  return (
    <S.Container>
      {products.map(product => (
        <S.TextRowWrapper key={product.id}>
          <S.ProductDescription>
            {product.name} {product.count}개
          </S.ProductDescription>
          <S.ProductDescription>
            {product.discountPrice.toLocaleString()}원
          </S.ProductDescription>
        </S.TextRowWrapper>
      ))}
      <S.TextRowWrapper>
        <S.PaymentInfoText>총 결제금액</S.PaymentInfoText>
        <S.PaymentInfoText>{totalPrice.toLocaleString()}원</S.PaymentInfoText>
      </S.TextRowWrapper>
      <S.TextRowWrapper>
        <S.OrderMethodText>결제방법</S.OrderMethodText>
        <S.OrderMethodText>
          {getPaymentMethodText(paymentMethod)}
        </S.OrderMethodText>
      </S.TextRowWrapper>
    </S.Container>
  );
};

export default OrderProductsInfo;
