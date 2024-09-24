import {PropsOf} from '@emotion/react';
import React from 'react';
import S from './BottomButton.style';

type Props = PropsOf<typeof S.Button>;

const BottomButton = (props: Props) => {
  return (
    <S.FloatingContainer>
      <S.Button {...props} mode="contained">
        {props.children}
      </S.Button>
    </S.FloatingContainer>
  );
};

export default BottomButton;
