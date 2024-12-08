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
        <S.InfoTextRowWrapper key={product.id}>
          <S.InfoText>
            {product.name} {product.count}개
          </S.InfoText>
          <S.InfoText>{product.discountPrice.toLocaleString()}원</S.InfoText>
        </S.InfoTextRowWrapper>
      ))}
      <S.InfoTextRowWrapper>
        <S.InfoBoldText>총 결제금액</S.InfoBoldText>
        <S.InfoBoldText>{totalPrice.toLocaleString()}원</S.InfoBoldText>
      </S.InfoTextRowWrapper>
      <S.InfoTextRowWrapper>
        <S.OrderMethodText>결제방법</S.OrderMethodText>
        <S.OrderMethodText>
          {getPaymentMethodText(paymentMethod)}
        </S.OrderMethodText>
      </S.InfoTextRowWrapper>
    </S.Container>
  );
};

export default OrderProductsInfo;
