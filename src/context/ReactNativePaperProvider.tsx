import React from 'react';
import {PaperProvider} from 'react-native-paper';
import theme from './theme';

const ReactNativePaperProvider = ({children}: {children: React.ReactNode}) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default ReactNativePaperProvider;
