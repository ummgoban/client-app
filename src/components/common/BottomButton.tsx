import React from 'react';
import {Button} from 'react-native-paper';

type Props = {
  children?: React.ReactNode;
};

const BottomButton = ({children}: Props) => {
  return <Button>{children}</Button>;
};

export default BottomButton;
