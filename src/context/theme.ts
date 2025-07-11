import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {theme as sharedTheme} from '@ummgoban/shared';

const theme = {
  ...DefaultTheme,
  ...sharedTheme,
  colors: {
    ...DefaultTheme.colors,
    ...sharedTheme.colors,
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...sharedTheme.fonts,
    h1: {
      fontSize: 96,
      letterSpacing: -1.5,
      lineHeight: 104,
      fontFamily: 'Pretendard-Light',
    },
    h2: {
      fontSize: 60,
      letterSpacing: -0.5,
      lineHeight: 68,
      fontFamily: 'Pretendard-Light',
    },
    h3: {
      fontSize: 48,
      letterSpacing: 0,
      lineHeight: 56,
      fontFamily: 'Pretendard-Regular',
    },
    h4: {
      fontSize: 34,
      letterSpacing: 0.25,
      lineHeight: 42,
      fontFamily: 'Pretendard-Regular',
    },
    h5: {
      fontSize: 24,
      letterSpacing: 0,
      lineHeight: 32,
      fontFamily: 'Pretendard-Regular',
    },
    h6: {
      fontSize: 20,
      letterSpacing: 0.15,
      lineHeight: 28,
      fontFamily: 'Pretendard-Medium',
    },
    subtitle1: {
      fontSize: 16,
      letterSpacing: 0.15,
      lineHeight: 20,
      fontFamily: 'Pretendard-Regular',
    },
    subtitle2: {
      fontSize: 14,
      letterSpacing: 0.1,
      lineHeight: 20,
      fontFamily: 'Pretendard-Bold',
    },
    body1: {
      fontSize: 16,
      letterSpacing: 0.5,
      lineHeight: 20,
      fontFamily: 'Pretendard-Regular',
    },
    body2: {
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: 18,
      fontFamily: 'Pretendard-Regular',
    },
    button: {
      fontSize: 14,
      letterSpacing: 1.25,
      lineHeight: 18,
      fontFamily: 'Pretendard-Medium',
    },
    caption: {
      fontSize: 12,
      letterSpacing: 0.4,
      lineHeight: 16,
      fontFamily: 'Pretendard-Regular',
    },
    overline: {
      fontSize: 10,
      letterSpacing: 1.5,
      lineHeight: 14,
      fontFamily: 'Pretendard-Regular',
    },
  },
} as const;

export default theme;
