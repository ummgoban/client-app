import styled from '@emotion/native';

const S = {
  LogoContainer: styled.View``,

  TitleText: styled.Text`
    color: ${({theme}) => theme.colors.dark};
    ${({theme}) => theme.fonts.subtitle2};
  `,
};

export default S;
