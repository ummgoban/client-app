import React from 'react';
import S from './MarketInfo.style';

type MarketInfoProps = {
  market: {
    id: number;
    name: string;
    images: string[];
  };
};

const MarketInfo = ({market}: MarketInfoProps) => {
  return (
    <S.MarketInfoWrapper>
      <S.MarketInfoImage source={{uri: market.images[0]}} />
      <S.MarketInfoText>{market.name}</S.MarketInfoText>
    </S.MarketInfoWrapper>
  );
};

export default MarketInfo;
