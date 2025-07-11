import styled from '@emotion/native';

const S = {
  Container: styled.KeyboardAvoidingView`
    flex: 1;
  `,
  LoginPageContainer: styled.ScrollView`
    flex: 1;
    background-color: white;
  `,

  MomChanPickLogoWrapper: styled.View`
    margin-top: 80px;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;
  `,

  LoginButtonContainer: styled.View`
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 16px 0;
  `,

  LoginButtonWrapper: styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
  `,

  SocialLoginText: styled.Text`
    text-align: center;
    ${({theme}) => theme.fonts.body2}
  `,
};

export default S;
