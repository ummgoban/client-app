import React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const ReactNativePaperProvider = ({children}: {children: React.ReactNode}) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default ReactNativePaperProvider;
