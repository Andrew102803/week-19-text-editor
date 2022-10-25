const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    // file entry
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // bundle output
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    //configuration added as a manifest file
    plugins: [
     // plugin added
     new HtmlWebpackPlugin({
      // copy of index added to the dist folder tbh fr fr
      template: './index.html', 
      // Optional parameters
      title: 'Text Editor'
    }),
   
    // adds the service worker
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),

    // json fuilr made
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Just another text editor',
      short_name: 'JATE',
      description: 'qoeuhfkjsaekfjebkjhfdbhkjedahkbjv!',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    ],

    module: {
      // css added
      rules: [
        {
          // finds le css file
          test: /\.css$/i,
          // converts css into js actually well
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // loader from bable in webpack order
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"]
            }
          }
        }
      ],
    },
  };
};