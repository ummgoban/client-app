import styled from '@emotion/native';

import {Card, Text} from 'react-native-paper';

const S = {
  Container: styled.View`
    padding: 8px;
    background-color: white;
    flex: 1;
  `,
  NoticeCard: styled(Card)`
    background-color: white;
    padding: 12px 8px;
    margin-bottom: 16px;
  `,

  NoticeCardContent: styled.View`
    display: flex;
    flex-direction: column;

    gap: 8px;
  `,

  Title: styled(Text)`
    ${({theme}) => theme.fonts.subtitle1};
    font-weight: 600;
  `,

  Description: styled(Text)`
    ${({theme}) => theme.fonts.body2};
    line-height: 20px;
    margin-bottom: 12px;
  `,
};

export default S;
