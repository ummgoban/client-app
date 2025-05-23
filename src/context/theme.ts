import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    // primary: green
    primary: 'rgba(112, 200, 2, 1)',
    primaryHover: 'rgba(112, 200, 2, 0.08)',
    primaryPressed: 'rgba(112, 200, 2, 0.18)',
    primaryDisabled: 'rgba(112, 200, 2, 0.38)',

    primaryLight: 'rgba(22, 190, 83, 1)',

    // secondary: white
    secondary: 'rgba(255, 255, 255, 1)',
    secondaryHover: 'rgba(255, 255, 255, 0.08)',
    secondaryPressed: 'rgba(255, 255, 255, 0.18)',
    secondaryDisabled: 'rgba(255, 255, 255, 0.38)',

    // tertiary: black
    tertiary: 'rgba(0, 0, 0, 1)',
    tertiaryHover: 'rgba(0, 0, 0, 0.08)',
    tertiaryPressed: 'rgba(0, 0, 0, 0.18)',
    tertiaryDisabled: 'rgba(0, 0, 0, 0.38)',

    // warning: yellow
    warning: 'rgba(255, 152, 0, 1)',
    warningHover: 'rgba(255, 152, 0, 0.08)',
    warningPressed: 'rgba(255, 152, 0, 0.18)',
    warningDisabled: 'rgba(255, 152, 0, 0.38)',

    // error: red
    error: 'rgba(255, 44, 44, 1)',
    errorHover: 'rgba(255, 44, 44, 0.08)',
    errorPressed: 'rgba(255, 44, 44, 0.18)',
    errorDisabled: 'rgba(255, 44, 44, 0.38)',

    // disabled
    disabled: 'rgba(174, 174, 174, 1)',

    // dark
    dark: 'rgba(29, 38, 58, 1)',
  },
  fonts: {
    ...DefaultTheme.fonts,
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
