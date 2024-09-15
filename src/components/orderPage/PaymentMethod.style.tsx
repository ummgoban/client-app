import styled from '@emotion/native';
import {RadioButton} from 'react-native-paper';

const PaymentRadioButtonItem = styled(RadioButton.Item)`
  width: 100%;

  padding: 0;

  display: flex;
  flex-direction: row-reverse;
`;

const S = {
  PaymentRadioButtonItem,
};

export default S;
