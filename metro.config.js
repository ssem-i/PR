const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...config.resolver.sourceExts, 'svg'],
  };

  return config;
})();
