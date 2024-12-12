import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

const Container = styled.View`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled(Text)`
  ${({theme}) => theme.fonts.body1}
`;

const LoginButton = styled(Button)`
  ${({theme}) => theme.fonts.h6}

  color: ${({theme}) => theme.colors.primary}
`;

const S = {
  Container,
  Description,
  LoginButton,
};

export default S;
