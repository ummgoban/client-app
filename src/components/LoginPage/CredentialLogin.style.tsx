import styled from '@emotion/native';
import {Button, TextInput} from 'react-native-paper';

const LoginFormWrapper = styled.View`
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const LoginTextInput = styled(TextInput)`
  width: 100%;
  height: 48px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const SignUpButton = styled(Button)`
  text-align: center;
  ${({theme}) => theme.fonts.body2}
`;

const HorizontalLine = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({theme}) => theme.colors.primaryDisabled};

  margin-bottom: 16px;
`;

const S = {
  LoginFormWrapper,
  LoginTextInput,
  SubmitButton,
  SignUpButton,
  HorizontalLine,
};

export default S;
