module.exports = {
  presets: [
    'module:@react-native/babel-preset',
  ],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.json', '.ts', '.tsx'],
        root: ['./src']
      },
    ],
  ],
};
