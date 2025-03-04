import React from 'react';

import S from './EmptyMarket.style';

type EmptyMarketProps = {
  onPress: () => void;
  title: string;
  buttonText: string;
};

const EmptyMarket = ({onPress, title, buttonText}: EmptyMarketProps) => {
  return (
    <S.Container>
      <S.TitleText>{title}</S.TitleText>
      <S.Button onPress={onPress} mode="contained">
        {buttonText}
      </S.Button>
    </S.Container>
  );
};

export default EmptyMarket;
