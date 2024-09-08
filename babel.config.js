module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@context': './src/context',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          // '@types': './src/types', // @types is typescript library, so use @/types instead of @types
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
