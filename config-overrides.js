module.exports = function override(config) {
  //  ATTENTION:  less support for antd
  const loaders = config.module.rules[1].oneOf;
  loaders.splice(loaders.length - 1, 0, {
    test: /\.less$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            //  ATTENTION:  antd variables can be added inside modifyVars
            //  EXAMPLE:  '@primary-color': '#1DA57A'
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    ],
  });
  return config;
};
