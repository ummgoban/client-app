import styled from '@emotion/native';
import {Button as RNPButton} from 'react-native-paper';

const FloatingContainer = styled.View`
  position: fixed;
  bottom: 0;

  padding: 0 16px;
`;

const Button = styled(RNPButton)`
  width: 100%;
  border-radius: 8px;
  margin: 16px 0;
`;

const S = {
  FloatingContainer,
  Button,
};

export default S;
