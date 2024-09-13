import {ThemeProvider} from '@emotion/react';
import React from 'react';
import theme from './theme';

const EmotionProvider = ({children}: {children: React.ReactNode}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default EmotionProvider;
