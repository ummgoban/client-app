import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

// TODO: 각종 공통 테마 적용하기
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default theme;
