import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

import C from './Common.style';

const Card = styled(C.CommonCard)`
  display: flex;
  justify-content: flex-start;
  gap: 12px;

  padding: 36px 8px;
`;

const PlaneText = styled(Text)`
  padding: 0 8px;

  color: rgb(0, 0, 0);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
`;

const DatePickerButton = styled(Button)`
  display: flex;
  flex-direction: row;

  gap: 8px;

  padding: 8px 0;
`;

const DatePickerText = styled(Text)`
  color: rgb(0, 0, 0);
  font-family: Pretendard;
  font-size: 24px;
  font-style: bold;
  font-weight: 600;
  line-height: 36px;
`;

const S = {Card, PlaneText, DatePickerButton, DatePickerText};

export default S;
