import styled from '@emotion/native';
import {Button} from 'react-native-paper';

const S = {
  ScreenWrapper: styled.ScrollView`
    flex: 1;

    margin: 16px 0;
  `,

  LoginFormWrapper: styled.View`
    padding: 0 16px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  `,

  SubmitButton: styled(Button)`
    width: 100%;
  `,

  SignUpButton: styled(Button)`
    width: 100%;
    text-align: center;
    ${({theme}) => theme.fonts.body2}
  `,

  HorizontalLine: styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.primaryDisabled};

    margin-bottom: 16px;
  `,

  EmailVerifyContainer: styled.View`
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 8px;
  `,

  SendEmailCodeButton: styled(Button)`
    width: 100%;
    height: 48px;
  `,

  VerifyEmailCodeButton: styled(Button)`
    width: 100%;
    height: 48px;
  `,
};

export default S;
