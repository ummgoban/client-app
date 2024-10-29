import React from 'react';
import S from './NavigateTextButton.style';
import Icon from 'react-native-vector-icons/AntDesign';

type NavigationTextButtonProps = {
  text: string;
  onPress?: () => void;
  fontColor?: string;
  fontSize?: string;
  iconSize?: number;
  isNotice?: boolean;
};

const NavigationTextButton = ({
  text,
  onPress,
  fontColor = '#000',
  fontSize = '16px',
  iconSize = 16,
  isNotice = true,
}: NavigationTextButtonProps) => {
  return (
    <S.TouchableButtonContainer onPress={onPress} disabled={!Boolean(onPress)}>
      <S.TouchableWrapper>
        <S.NoticeText fontColor={fontColor} fontSize={fontSize}>
          {text}
        </S.NoticeText>
        {isNotice && <Icon name="right" size={iconSize} color={fontColor} />}
      </S.TouchableWrapper>
    </S.TouchableButtonContainer>
  );
};

export default NavigationTextButton;
