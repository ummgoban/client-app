import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(112, 200, 2, 1)',
    primaryHover: 'rgba(112, 200, 2, 0.08)',
    primaryPressed: 'rgba(112, 200, 2, 0.18)',
    primaryDisabled: 'rgba(112, 200, 2, 0.38)',
    secondary: 'rgba(255, 255, 255, 1)',
    secondaryHover: 'rgba(255, 255, 255, 0.08)',
    secondaryPressed: 'rgba(255, 255, 255, 0.18)',
    secondaryDisabled: 'rgba(255, 255, 255, 0.38)',
    tertiary: 'rgba(0, 0, 0, 1)',
    tertiaryHover: 'rgba(0, 0, 0, 0.08)',
    tertiaryPressed: 'rgba(0, 0, 0, 0.18)',
    tertiaryDisabled: 'rgba(0, 0, 0, 0.38)',
  },
  fonts: {
    ...DefaultTheme.fonts,
    h1: {
      fontSize: 96,
      fontWeight: 'light',
      letterSpacing: -1.5,
    },
    h2: {
      fontSize: 60,
      fontWeight: 'light',
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 48,
      fontWeight: 'regular',
      letterSpacing: 0,
    },
    h4: {
      fontSize: 34,
      fontWeight: 'regular',
      letterSpacing: 0.25,
    },
    h5: {
      fontSize: 24,
      fontWeight: 'regular',
      letterSpacing: 0,
    },
    h6: {
      fontSize: 20,
      fontWeight: 'medium',
      letterSpacing: 0.15,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 'regular',
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 'medium',
      letterSpacing: 0.1,
    },
    body1: {
      fontSize: 16,
      fontWeight: 'regular',
      letterSpacing: 0.5,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'regular',
      letterSpacing: 0.25,
    },
    button: {
      fontSize: 14,
      fontWeight: 'medium',
      letterSpacing: 1.25,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'regular',
      letterSpacing: 0.4,
    },
    overline: {
      fontSize: 10,
      fontWeight: 'regular',
      letterSpacing: 1.5,
    },
  },
} as const;

export default theme;
