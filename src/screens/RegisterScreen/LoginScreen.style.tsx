import styled from '@emotion/native';

const LoginPageContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const MomChanPickLogoWrapper = styled.View`
  margin-top: 80px;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
`;

const LoginButtonContainer = styled.View`
  display: flex;
  align-items: center;
  gap: 16px;

  margin: 16px 0;
`;

const LoginButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const SocialLoginText = styled.Text`
  text-align: center;
  ${({theme}) => theme.fonts.body2}
`;

const S = {
  LoginButtonContainer,
  LoginButtonWrapper,
  LoginPageContainer,
  MomChanPickLogoWrapper,
  SocialLoginText,
};

export default S;
