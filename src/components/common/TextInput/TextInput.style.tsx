import styled from '@emotion/native';
import {Text} from 'react-native-paper';

const S = {
  Container: styled.View`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,

  TextInputWrapper: styled.View`
    display: flex;
    gap: 8px;
  `,

  TextInputContainer: styled.View`
    width: 100%;
    height: 48px;
  `,

  Label: styled(Text)`
    ${({theme}) => theme.fonts.body2}
  `,

  ErrorContainer: styled.View`
    display: flex;
    justify-content: center;
    align-items: flex-start;

    margin-top: 8px;
    width: 100%;
  `,

  ErrorText: styled(Text)`
    color: ${({theme}) => theme.colors.error};

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  `,
};

export default S;
