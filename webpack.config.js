const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = function (env, argv) {
  return {
    mode: 'production',
    devtool: 'source-map',
    entry: {
      index: './src/index.ts'
    },
    output: {
      path: `${__dirname}/lib`,
      filename: '[name]-bundle.js',
      publicPath: '/lib/',
      assetModuleFilename: '[name][ext]'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new CssMinimizerPlugin()
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.json']
    },
    module: {
      rules: [
        // TS/JSON
        {
          test: /\.(ts|tsx|json)$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          include: [__dirname],
          use: {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              transpileOnly: true
            }
          }
        },
        // Normal LESS files
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 2 }
            },
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  paths: [path.resolve(__dirname, 'node_modules')]
                }
              }
            }
          ]
        }
      ]
    },
    stats: {
      children: false,
      entrypoints: true,
      modules: false
    },
    performance: {
      hints: false
    }
  }
}
