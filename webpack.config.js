var path = require('path');
var webpack = require('webpack');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
    entry: {
        'lavenderJS-UMD': './src/index.ts',
        'lavenderJS-UMD.min': './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'Lavender',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            include: /\.min\.js$/,
        }),
        new TypedocWebpackPlugin({
            name: 'LavenderJS',
            mode: 'file',
            //theme: './typedoc-theme/',
            ignoreCompilerErrors: true,
            excludePrivate:true,
            includeDeclarations:true,
            excludeExternals:true
        }, './src')
    ],
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
            query: {
                declaration: false,
            }
        }]
    }
};