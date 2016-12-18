'use strict';
let path = require('path');
let defaultSettings = require('./default');
let values = require('postcss-modules-values');
// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
// let bowerBase = path.join(__dirname,'../bower_components');

let additionalPaths = [];

// additionalPaths.push(path.join(bowerBase,'jquery'));
// additionalPaths.push(path.join(bowerBase, 'wookmark'));
// additionalPaths.push(path.join(bowerBase, 'imagesloaded/imagesloaded.pkgd'));

module.exports = {
    additionalPaths: additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../dist/assets'), //你想把打包文件放在哪个地方
        filename: '[name].js',
        publicPath: defaultSettings.publicPath
        // publicPath: 'http://127.0.0.1:8080/'
    },
    devServer: {
        contentBase: './dist/', // 服务器目录根目录
        historyApiFallback: true,
        inline: true,
        progress: true,
        hot: true,
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        // publicPath: 'http://127.0.0.1:8080/',
        noInfo: false
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            framework: `${defaultSettings.rootPath}/framework`,
            util: `${defaultSettings.rootPath}/framework/util`,

            views: `${defaultSettings.srcPath}/views`,
            components: `${defaultSettings.srcPath}/components`,
            containers: `${defaultSettings.srcPath}/containers`,
            layouts: `${defaultSettings.srcPath}/layouts`,
            reduxs: `${defaultSettings.srcPath}/reduxs`,
            routers: `${defaultSettings.srcPath}/routers`,
            config: `${defaultSettings.srcPath}/config`,

            image: `${defaultSettings.srcPath}/static/image`,
            style: `${defaultSettings.srcPath}/static/style`,


            bower_components: `${defaultSettings.rootPath}/bower_components`
        }
    },
    module: {},
    postcss: [
      values
    ]
};
