import React from 'react';
import S from './NavigateButton.style';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type NavigateNoticeTextButtonProps = {
  text: string;
  onPress: () => void;
  fontColor?: string;
  fontSize?: string;
  iconSource?: {uri: string};
  iconSize?: number;
};

// TODO: Icon 색상 변경
const NavigateNoticeTextButton = ({
  text,
  onPress,
  fontColor = '#000',
  fontSize = '16px',
  iconSize = 16,
}: NavigateNoticeTextButtonProps) => {
  return (
    <S.TouchableNavigateWrapper>
      <S.NoticeText fontColor={fontColor} fontSize={fontSize}>
        {text}
      </S.NoticeText>
      <TouchableOpacity onPress={onPress}>
        <Icon name="right" size={iconSize} color={fontColor} />
      </TouchableOpacity>
      {/* <Image
       source={iconSource}
         style={{width: iconWidth, height: iconHeight}}
       /> */}
    </S.TouchableNavigateWrapper>
  );
};

export default NavigateNoticeTextButton;
