'use strict';
let htmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./default');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
process.env.NODE_ENV = 'production';

let extractCSS = new ExtractTextPlugin('[name]_[contenthash].css');
let extractSCSS = new ExtractTextPlugin('[name]_[contenthash].css');

let config = Object.assign({}, baseConfig, {
    entry: {
          index: defaultSettings.srcPath + '/app.js'
    },
    cache: false,
    devtool: 'sourcemap',
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new htmlWebpackPlugin({
            template: defaultSettings.rootPath + '/index.html',
            filename: '../index.html',
            inject: true, //Inject all scripts into the body
            hash: false,
            chunks: ['index_[contenthash]']
        }),
        /* new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',   // 将公共模块提取，生成名为`vendors`bundle
            chunks: ['vendors'], //提取哪些模块共有的部分,名字为上面的vendor
            minChunks: Infinity // 提取至少*个模块共有的部分
        }), */

        extractCSS, //单独使用link标签加载css并设置路径，相对于output配置中的 publickPath
        extractSCSS,
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new BowerWebpackPlugin({
            modulesDirectories: ["bower_components"],
            manifestFiles:      "bower.json",
            includes:           /.*/,
            excludes:           /.*\.less/,
            searchResolveModulesDirectories: true
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.AggressiveMergingPlugin(),
        // new webpack.NoErrorsPlugin()
        new webpack.DllReferencePlugin({
            context: '/', // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
            manifest: require('../manifest.json'), // 指定manifest.json
            name: 'dll',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
        })
    ],
    module: defaultSettings.getDefaultModules(),
    externals: {
        "window" : 'window',
        "document": 'document'
    }
});

// Add needed loaders to the defaults here
config.module.loaders.push(
    {
      test: /\.css$/,
        loader: extractCSS.extract('css-loader')
    },
    {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [].concat(
            config.additionalPaths,
            [ path.join(__dirname, '/../src'), path.join(__dirname,'/../framework/util') ]
        )
    },
    {
        test: /\.scss/,
        loader: extractSCSS.extract('css-loader?modules&localIdentName=[local]_[hash:base64:10]!postcss-loader!sass-loader?outputStyle=compressed'),
        exclude: path.resolve(__dirname, '../src/static')
    },
    {
        test: /\.scss/,
        loader: extractSCSS.extract('css-loader!postcss-loader!sass-loader?outputStyle=compressed'),
        include: path.resolve(__dirname, '../src/static')
    }
);

module.exports = config;
