var webpackConfig = require('./webpack.dev.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: ['./test/test_index.ts'],
    exclude: [],
    preprocessors: {
      './test/test_index.ts': ['webpack']
    },
    webpack: {
      entry: './test/test_index.ts',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  });
}
