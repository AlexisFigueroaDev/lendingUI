const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// const {
//   createSentryMetroSerializer,
// } = require('@sentry/react-native/dist/js/tools/sentryMetroSerializer');

const defaultConfig = getDefaultConfig(__dirname);
const {resolver, transformer} = defaultConfig;
const {sourceExts, assetExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    ...resolver,
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
  },

  transformer: {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },

  // serializer: {
  //   customSerializer: createSentryMetroSerializer(),
  // },
};

module.exports = mergeConfig(defaultConfig, config);
