import styled from '@emotion/native';
import {RadioButton} from 'react-native-paper';
import C from './Common.style';

const Card = styled(C.CommonCard)``;
const HeaderText = styled(C.HeaderText)``;

const PaymentRadioButtonItem = styled(RadioButton.Item)`
  width: 100%;

  padding: 0;

  display: flex;
  flex-direction: row-reverse;
`;

const S = {
  Card,
  HeaderText,
  PaymentRadioButtonItem,
};

export default S;
