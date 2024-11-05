import {MarketType} from '@/types/Market';
import S from './Market.style';
import React from 'react';
type Props = {
  market: MarketType;
  onPress: (marketId: number) => void;
};
const Market = ({market, onPress}: Props) => {
  console.log('현재 가게 정보: ', market);
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
        {`픽업: ${market.pickupStartAt} ~ ${market.pickupEndAt}`}
      </S.MarketPickupTime>
    </S.MarketWrapper>
  );
};

export default Market;
