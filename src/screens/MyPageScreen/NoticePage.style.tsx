import styled from '@emotion/native';

import {Card, Text} from 'react-native-paper';

const Container = styled.ScrollView`
  padding: 8px;
  background-color: white;
`;

const NoticeCard = styled(Card)`
  background-color: white;
  padding: 12px 8px;
`;

const NoticeCardContent = styled.View`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const Title = styled(Text)`
  ${({theme}) => theme.fonts.subtitle1};
`;

const Description = styled(Text)`
  ${({theme}) => theme.fonts.body2};
`;

const S = {
  Container,
  NoticeCard,
  NoticeCardContent,
  Title,
  Description,
};

export default S;
