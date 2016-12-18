/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const rootPath = path.join(__dirname, '../')
const dfltPort = 8000;

// my path
let pagePath = path.join(__dirname, '/../src/page');
let componentPath = __dirname + '/../src/lib/components';
let imagePath = __dirname + '/../src/static/images';
let frameWorkPath = __dirname +'/../src/lib/framework';
let publicPath = '/assets/';

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
    return {
        loaders: [
            {
              test: /\.sass/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
              test: /\.styl/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
              test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
            /* {
              test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
              loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
            }, */
        ]
    };
}

module.exports = {
    srcPath: srcPath,
    rootPath: rootPath,
    publicPath: publicPath,  // 文件映射在在后端服务器的目录，根据后端设置而定
    port: dfltPort,
    getDefaultModules: getDefaultModules,
    pagePath: pagePath,
    componentPath: componentPath,
    imagePath: imagePath,
    frameWorkPath: frameWorkPath

};
