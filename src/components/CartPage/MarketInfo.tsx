import React from 'react';
import S from './MarketInfo.style';
import {MarketType} from '@/types/Market';

type MarketInfoProps = {
  market: MarketType;
  onPress: () => void;
};
const MarketInfo = ({market, onPress}: MarketInfoProps) => {
  return (
    <S.MarketInfoWrapper onPress={onPress}>
      <S.MarketInfoImage source={{uri: market.images[0]}} />
      <S.MarketInfoText>{market.name}</S.MarketInfoText>
    </S.MarketInfoWrapper>
  );
};

export default MarketInfo;
