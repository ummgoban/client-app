import styled from '@emotion/native';
import {Button, Text} from 'react-native-paper';

import C from './Common.style';
import {View} from 'react-native';

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

const DatePickerContainer = styled(View)`
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 8px;
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

const PickupAbleTextContainer = styled.View`
  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: 8px;

  padding: 0px 8px;
`;

const PickupAbleText = styled(Text)`
  color: rgb(0, 0, 0);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

const S = {
  Card,
  PlaneText,
  DatePickerContainer,

  DatePickerButton,
  DatePickerText,
  PickupAbleTextContainer,
  PickupAbleText,
};

export default S;
