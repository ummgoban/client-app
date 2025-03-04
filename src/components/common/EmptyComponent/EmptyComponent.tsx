import React from 'react';

import S from './EmptyComponent.style';

type EmptyComponentProps = {
  onPress: () => void;
  title: string;
  buttonText: string;
};

const EmptyComponent = ({onPress, title, buttonText}: EmptyComponentProps) => {
  return (
    <S.Container>
      <S.TitleText>{title}</S.TitleText>
      <S.Button onPress={onPress} mode="contained">
        {buttonText}
      </S.Button>
    </S.Container>
  );
};

export default EmptyComponent;
