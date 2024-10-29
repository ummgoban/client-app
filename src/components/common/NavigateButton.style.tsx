import styled from '@emotion/native';

const TouchableWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const TouchableButtonContainer = styled.TouchableOpacity``;

const NoticeText = styled.Text<{fontSize?: string; fontColor?: string}>`
  font-size: ${({fontSize}) => fontSize};
  line-height: ${({fontSize}) =>
    fontSize ? `${parseInt(fontSize, 10) + 4}px` : 'auto'};
  font-weight: 600;
  color: ${({fontColor}) => fontColor};
`;

const S = {TouchableButtonContainer, NoticeText, TouchableWrapper};

export default S;
