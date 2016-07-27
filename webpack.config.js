var path              = require('path');
var webpack           = require('webpack');
var autoprefixer      = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var SERVER_PORT = 8000;

module.exports = {
    entry: {
        app: './src/app/app.js',
        vendor: ["jquery", "angular", "lodash", "angular-ui-router"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    plugins: [
        new ExtractTextPlugin('bundle.css', {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            inject: 'body'
        }),
        new OpenBrowserPlugin({url: 'http://localhost:' + SERVER_PORT, ignoreErrors: true})
    ],
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: [
            path.join(__dirname, 'node_modules')
        ]
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "jshint-loader", exclude: /node_modules/}
        ],
        loaders: [
            // sass loader
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },

            // css loader
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },

            // assets loader
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'file-loader'},

            // html loader
            { test: /\.html$/, loader: 'raw-loader'},

            // js loader
            { test: /\.js$/, loaders: ['ng-annotate'], exclude: /node_modules/ },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'src', 'app'),
        historyApiFallback: true,
        port: SERVER_PORT
    }
};
