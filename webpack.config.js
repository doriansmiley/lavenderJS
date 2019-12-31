const path = require('path');
const webpack = require('webpack');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
    optimization: {
        minimizer: [new TerserPlugin({
            sourceMap: true,
        })],
    },
    plugins: [
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
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};
