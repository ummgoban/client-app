import React from 'react';

import S from './MarketInfo.style';

import {MarketType} from '@/types/Market';

type MarketInfoProps = {
  market: Pick<MarketType, 'id' | 'name'>;
  onPress: () => void;
};
const MarketInfo = ({market, onPress}: MarketInfoProps) => {
  return (
    <S.MarketInfoWrapper onPress={onPress}>
      <S.MarketInfoText>{market.name}</S.MarketInfoText>
    </S.MarketInfoWrapper>
  );
};

export default MarketInfo;
