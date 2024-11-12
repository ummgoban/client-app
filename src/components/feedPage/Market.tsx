import {MarketType} from '@/types/Market';
import S from './Market.style';
import React from 'react';
import {Text} from 'react-native';
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
            <S.MenuGradation
              colors={[
                'rgba(0, 0, 0, 0.7)',
                'rgba(0, 0, 0, 0.28)',
                'rgba(0, 0, 0, 0)',
              ]}
              locations={[0, 0.3, 0.7]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
            <S.MenuLabel numberOfLines={1}>{product.name}</S.MenuLabel>
            <S.PriceLabel>
              {product.discountPrice.toLocaleString()}원
            </S.PriceLabel>
          </S.MarketImageBox>
        ))}
      </S.MarketImageContainer>
      <S.MarketInfoDiscription>
        <S.MarketTitle>{market.name}</S.MarketTitle>
        <S.MarketAddress>
          {market.address} {market.specificAddress}
        </S.MarketAddress>
        <S.MarketPickupTime>
          픽업 가능 시간: {market.openAt}~ {market.closeAt}
        </S.MarketPickupTime>
      </S.MarketInfoDiscription>
    </S.MarketWrapper>
  );
};

export default Market;
