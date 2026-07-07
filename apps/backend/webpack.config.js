const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === 'production';
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
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(!isProd && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  ignoreWarnings: [
    /Failed to parse source map/,
    /Critical dependency: the request of a dependency is an expression/,
    /Module not found: Error: "\." is not exported/,
  ],
  externals: [
    nodeExternals({
      modulesDir: join(workspaceRoot, 'node_modules'),
    }),
  ],
  resolve: {
    alias: {
      'class-transformer/storage':
        require.resolve('class-transformer/cjs/storage.js'),
    },
  },
  plugins: [
    lazyImportsWebpackPlugin(),
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: isProd,
      sourceMap: !isProd,
      externalDependencies: 'all',
      mergeExternals: true,
    }),
  ],
};
