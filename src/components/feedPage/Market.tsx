import React from 'react';

import DotIndicator from '@/assets/icons/dot.svg';

import {MarketType} from '@/types/Market';

import S from './Market.style';

type Props = {
  market: MarketType;
  onPress: (marketId: number) => void;
};

const Market = ({market, onPress}: Props) => {
  return (
    <S.MarketWrapper onPress={() => onPress(market.id)}>
      <S.MarketImageContainer
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {market.products
          .filter(p => p.stock && p.productStatus !== 'HIDDEN')
          .map(product => (
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
              <S.LableWrapper>
                <S.MenuLabel numberOfLines={1}>{product.name}</S.MenuLabel>
                <S.PriceLabel>
                  {product.discountPrice.toLocaleString()}원
                </S.PriceLabel>
              </S.LableWrapper>
            </S.MarketImageBox>
          ))}
      </S.MarketImageContainer>
      <S.MarketInfoDiscription>
        <S.MarketTitle>{market.name}</S.MarketTitle>
        <S.DescriptionContainer>
          <S.MarketPickupTime>
            <S.LightText>{'픽업'}</S.LightText>
            <S.DarkText>{`${market.pickupStartAt}~${market.pickupEndAt}`}</S.DarkText>
          </S.MarketPickupTime>
          <DotIndicator width={2} height={2} color="rgba(174, 174, 174, 1)" />
          {/* TODO: 주소 대신 현재 위치에서 거리 표시 (600m dot 도보 4분) 형태 */}
          <S.DarkText>{market.address}</S.DarkText>
        </S.DescriptionContainer>
      </S.MarketInfoDiscription>
    </S.MarketWrapper>
  );
};

export default Market;
