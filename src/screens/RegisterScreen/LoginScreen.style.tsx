import styled from '@emotion/native';

const LoginPageContainer = styled.View`
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
  margin-top: 32px;
`;

const LoginButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const S = {
  LoginButtonContainer,
  LoginButtonWrapper,
  LoginPageContainer,
  MomChanPickLogoWrapper,
};

export default S;
