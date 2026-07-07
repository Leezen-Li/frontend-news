const { join } = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const workspaceRoot = join(__dirname, '../..');

const lazyNestImports = [
  '@nestjs/microservices',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets',
  '@nestjs/websockets/socket-module',
  '@nestjs/platform-socket.io',
];

function lazyImportsWebpackPlugin() {
  return new webpack.IgnorePlugin({
    checkResource(resource) {
      if (!lazyNestImports.some((pkg) => resource.startsWith(pkg))) {
        return false;
      }

      try {
        require.resolve(resource, { paths: [workspaceRoot] });
        return false;
      } catch {
        return true;
      }
    },
  });
}

module.exports = {
  mode: 'development',
  target: 'node',
  entry: ['webpack/hot/poll?100', join(__dirname, 'src/main.ts')],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'main.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  externals: [
    nodeExternals({
      modulesDir: join(workspaceRoot, 'node_modules'),
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'class-transformer/storage':
        require.resolve('class-transformer/cjs/storage.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: require.resolve('ts-loader'),
        options: {
          configFile: join(__dirname, 'tsconfig.app.json'),
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    lazyImportsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [/\.js$/, /\.d\.ts$/] }),
    new RunScriptWebpackPlugin({
      name: 'main.js',
      autoRestart: false,
    }),
  ],
};
