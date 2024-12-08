import * as React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import S from './ActivityIndicator.style';
const CustomActivityIndicator = () => (
  <S.Container>
    <ActivityIndicator animating={true} theme={{colors: {primary: 'green'}}} />
  </S.Container>
);
export default CustomActivityIndicator;
