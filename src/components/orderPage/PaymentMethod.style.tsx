import styled from '@emotion/native';
import {Card, RadioButton} from 'react-native-paper';

const PaymentMethodContainer = styled(Card)`
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

const PaymentRadioButtonItem = styled(RadioButton.Item)`
  width: 100%;

  padding: 0;

  display: flex;
  flex-direction: row-reverse;
`;

const S = {
  PaymentMethodContainer,
  HeaderText,
  PaymentRadioButtonItem,
};

export default S;
