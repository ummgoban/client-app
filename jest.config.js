/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverage: true,
  // ESM 모듈을 사용하는 패키지를 변환할 수 있도록 설정
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*|react-native-splash-screen|@?react-native-community/.*|@react-native/.*|react-native-vector-icons|react-native-async-storage)',
  ],
  // SplashScreen과 같은 네이티브 모듈을 모킹
  setupFiles: ['./jest.setup.js'],
};
