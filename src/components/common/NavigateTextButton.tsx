import React from 'react';
import S from './NavigateButton.style';
import {TouchableOpacity} from 'react-native';

type NavigateTextButtonProps = {
  text: string;
  onPress?: () => void;
  fontColor?: string;
  fontSize?: string;
};

const NavigateTextButton = ({
  text,
  onPress,
  fontColor = '#000',
  fontSize = '16px',
}: NavigateTextButtonProps) => {
  return (
    <S.TouchableButtonContainer>
      <TouchableOpacity onPress={onPress}>
        <S.NoticeText fontColor={fontColor} fontSize={fontSize}>
          {text}
        </S.NoticeText>
      </TouchableOpacity>
    </S.TouchableButtonContainer>
  );
};

export default NavigateTextButton;
