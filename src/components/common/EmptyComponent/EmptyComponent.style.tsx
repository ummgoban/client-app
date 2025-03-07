import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

const S = {
  Container: styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 16px;
  `,
  TitleText: styled(Text)`
    ${({theme}) => theme.fonts.subtitle2};
  `,
  Button: styled(Button)`
    margin: 16px 0;
  `,
};

export default S;
