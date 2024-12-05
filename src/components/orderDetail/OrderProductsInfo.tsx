import React from 'react';
import {ProductType} from '@/types/ProductType';
import S from './OrderProductsInfo.style';

type Props = {
  products: ProductType[];
  totalPrice: number;
};

const OrderProductsInfo = ({products, totalPrice}: Props) => {
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
        <S.InfoBoldText>총 금액</S.InfoBoldText>
        <S.InfoBoldText>{totalPrice.toLocaleString()}원</S.InfoBoldText>
      </S.InfoTextRowWrapper>
    </S.Container>
  );
};

export default OrderProductsInfo;
