// compose plugin to integrate multiple customt configs
const withPlugins = require('next-compose-plugins');
// bundle protons react components with this app
const withTM = require('next-transpile-modules')(['react-components', 'proton-shared']); // pass the modules you would like to see transpiled

module.exports = withPlugins([withTM], {
  webpack: (config, options) => {
    // add webpack inline loader as mentioned in the proton react components docs https://github.com/ProtonMail/react-components#remarks
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    });

    return config;
  },
});
