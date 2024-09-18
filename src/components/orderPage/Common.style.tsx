import styled from '@emotion/native';
import {Card} from 'react-native-paper';

const CommonCard = styled(Card)`
  padding: 16px;
  margin: 8px;

  display: flex;
  flex-direction: column;

  background-color: white;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: black;

  padding-bottom: 16px;
`;

const S = {CommonCard, HeaderText};

export default S;
