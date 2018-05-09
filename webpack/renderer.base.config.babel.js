import { resolve } from 'path';
import semverRegex from 'semver-regex';
import { devDependencies } from './../package.json';

const electronVersion = semverRegex().exec(devDependencies.electron)[0];

export default {
  context: resolve(__dirname, '..'),
  entry: {
    renderer: './src/renderer/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', { targets: { electron: electronVersion }, modules: false }],
            'stage-2',
            'react'
          ],
          plugins: [
            [
              "transform-runtime",
              {
                "helpers": false,
                "polyfill": true,
                "regenerator": true
              }
            ],
            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
          ]
        }
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,  // WOFF Font
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, // WOFF2 Font
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, // TTF Font
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' }, // EOT Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  // SVG Font
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        },
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg|tiff|webp)$/, use: { loader: "url-loader",options:{limit:8196,name:"images/[name].[ext]"} } }, // Common Image Formats
    ],
  },
  output: {
    path: resolve(__dirname, '../app/renderer'),
    filename: '[name].js',
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: resolve(__dirname, "../src/renderer/components/"),
      containers: resolve(__dirname, "../src/renderer/containers/"),
      emotions: resolve(__dirname, "../src/renderer/emotions/"),
      routes: resolve(__dirname, "../src/renderer/routes/"),
      models: resolve(__dirname, "../src/renderer/models/"),
      utils: resolve(__dirname, "../src/renderer/utils/"),
      main: resolve(__dirname, "../src/main/"),
      static: resolve(__dirname, "../static/")
    }
  },
  target: 'electron-renderer',
};
