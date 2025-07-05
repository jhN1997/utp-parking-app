module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@services': './services',
            '@screens': './screens',
            '@firebaseConfig': './firebaseConfig.js',
            '@components': './components',
            '@assets': './assets',
            '@utils': './utils',
          },
        },
      ],
    ],
  };
};
