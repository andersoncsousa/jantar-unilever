// Autor: Prazeres da Mesa
'use strict'
const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const tinyPngWebpackPlugin = require('tinypng-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public'),
        chunkFilename: '[name].[id].js',
    },
    devServer: {
        contentBase: "./src/index.html",
        port: 7000,
    },
    optimization: {
        splitChunks: {
            chunks: 'async'
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new HtmlWebpackPlugin({
            template: './src/unilever.html',
            filename: 'unilever.html',
            inject: 'body'
        }),
        new tinyPngWebpackPlugin({
            // key:"6Mb5VFwMQ3pBTqFpJk45CNHDSdpGkHL5",
            // key:"M38Y2383ZRQ5HF1wXDXwHF41KnqslLwg",
            // key:"vwpvh337rWH6nhVp6LkzkND9fBJlTr9S",
            // key:"Wf4R6bHhrk3FnLp4rKv6564MtqKhqC30",
            // key:"1Vn3FkmHwkYwykxTMpBNRxxdBg7NNVhJ",
            // key:"zSMH5vTMGgn0kS4df2rFy15DW3JpmJJJ",
            key: "RBCbGLMh4PdCZTWbNZykFFtgCcX7jTWS",
            // key:"5MSVq53NK3VKZyjxhLLSGT02JXdZ0MyT",
            ext: ['png', 'jpeg', 'jpg'],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.bundle\.js$/,
                loader: 'bundle-loader',
                options: {
                    lazy: true,
                    name: '[name]'
                }
            }, {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                        // plugins: ['@babel/plugin-transform-runtime'],
                        cacheDirectory: true,
                    }
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: [':src', 'video:src'],
                },
            }, {
                test: /\.s?[ac]ss$/,
                use: [
                    modoDev ? 'style-loader' : MiniCssExtractPlugin.loader,'css-loader', // interpreta @import, url()...
                ]
            }, {
                test: /\.(png|svgz|svg|jpeg|jpg|gif|woff|woff2|eot|ttf|otf)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './'
                    }
                },
            }]
    }
}
