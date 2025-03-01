import styled from '@emotion/native';

const LogoContainer = styled.View``;

const TitleText = styled.Text`
  color: ${({theme}) => theme.colors.dark};
  ${({theme}) => theme.fonts.subtitle2};
`;

const S = {
  LogoContainer,
  TitleText,
};

export default S;
