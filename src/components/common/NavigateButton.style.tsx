import styled from '@emotion/native';

const TouchableNavigateWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  max-width: 60%;
`;

const NoticeText = styled.Text<{fontSize?: string; fontColor?: string}>`
  font-size: ${({fontSize}) => fontSize};
  line-height: ${({fontSize}) =>
    fontSize ? `${parseInt(fontSize, 10) + 4}px` : 'auto'};
  font-weight: 600;
  color: ${({fontColor}) => fontColor || '#000'};
`;

const S = {TouchableNavigateWrapper, NoticeText};

export default S;
