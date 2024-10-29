import React from 'react';
import S from './NavigateButton.style';
import Icon from 'react-native-vector-icons/AntDesign';

type NavigateNoticeTextButtonProps = {
  text: string;
  onPress: () => void;
  fontColor?: string;
  fontSize?: string;
  iconSize?: number;
};

const NavigateNoticeTextButton = ({
  text,
  onPress,
  fontColor = '#000',
  fontSize = '16px',
  iconSize = 16,
}: NavigateNoticeTextButtonProps) => {
  return (
    <S.TouchableButtonContainer onPress={onPress}>
      <S.TouchableWrapper>
        <S.NoticeText fontColor={fontColor} fontSize={fontSize}>
          {text}
        </S.NoticeText>
        <Icon name="right" size={iconSize} color={fontColor} />
      </S.TouchableWrapper>
    </S.TouchableButtonContainer>
  );
};

export default NavigateNoticeTextButton;
