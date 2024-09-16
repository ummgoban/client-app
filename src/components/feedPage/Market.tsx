import {MarketType} from '@/types/Market';
import S from './Market.style';
import date from '@utils/date';
import React from 'react';
type Props = {
  market: MarketType;
  onPress: (marketId: number) => void;
};
const Market = ({market, onPress}: Props) => {
  return (
    <S.MarketWrapper onPress={() => onPress(market.id)}>
      <S.MarketImageContainer>
        {market.products.map(product => (
          <S.MarketImageBox key={product.id}>
            <S.MarketImage source={{uri: product.image}} />
            <S.PriceLabel>
              {product.name}: {product.discountPrice.toLocaleString()}원
            </S.PriceLabel>
          </S.MarketImageBox>
        ))}
      </S.MarketImageContainer>
      <S.MarketTitle>{market.name}</S.MarketTitle>
      <S.MarketPickupTime>
        {`픽업: ${date.format(
          market.pickupStartAt,
          'HH시 mm분',
        )} ~ ${date.format(market.pickupEndAt, 'HH시 mm분')}`}
      </S.MarketPickupTime>
    </S.MarketWrapper>
  );
};

export default Market;
