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
  },
  fonts: {
    ...DefaultTheme.fonts,
    h1: {
      fontSize: 96,
      fontWeight: 'light',
      letterSpacing: -1.5,
      lineHeight: 104,
      fontFamily: 'Roboto',
    },
    h2: {
      fontSize: 60,
      fontWeight: 'light',
      letterSpacing: -0.5,
      lineHeight: 68,
      fontFamily: 'Roboto',
    },
    h3: {
      fontSize: 48,
      fontWeight: 'regular',
      letterSpacing: 0,
      lineHeight: 56,
      fontFamily: 'Roboto',
    },
    h4: {
      fontSize: 34,
      fontWeight: 'regular',
      letterSpacing: 0.25,
      lineHeight: 42,
      fontFamily: 'Roboto',
    },
    h5: {
      fontSize: 24,
      fontWeight: 'regular',
      letterSpacing: 0,
      lineHeight: 32,
      fontFamily: 'Roboto',
    },
    h6: {
      fontSize: 20,
      fontWeight: 'medium',
      letterSpacing: 0.15,
      lineHeight: 28,
      fontFamily: 'Roboto',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 'regular',
      letterSpacing: 0.15,
      lineHeight: 20,
      fontFamily: 'Roboto',
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 'medium',
      letterSpacing: 0.1,
      lineHeight: 18,
      fontFamily: 'Roboto',
    },
    body1: {
      fontSize: 16,
      fontWeight: 'regular',
      letterSpacing: 0.5,
      lineHeight: 20,
      fontFamily: 'Roboto',
    },
    body2: {
      fontSize: 14,
      fontWeight: 'regular',
      letterSpacing: 0.25,
      lineHeight: 18,
      fontFamily: 'Roboto',
    },
    button: {
      fontSize: 14,
      fontWeight: 'medium',
      letterSpacing: 1.25,
      lineHeight: 18,
      fontFamily: 'Roboto',
    },
    caption: {
      fontSize: 12,
      fontWeight: 'regular',
      letterSpacing: 0.4,
      lineHeight: 16,
      fontFamily: 'Roboto',
    },
    overline: {
      fontSize: 10,
      fontWeight: 'regular',
      letterSpacing: 1.5,
      lineHeight: 14,
      fontFamily: 'Roboto',
    },
  },
} as const;

export default theme;
