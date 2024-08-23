const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        filename: './js/bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body' //all javascript resources will be placed at the bottom of the body element

        }),
        new MiniCssExtractPlugin({
            filename: './style/[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",

            },
            {
                test: /\.ico$/,
                type: "asset/resource",
                generator: {
                    filename: "./[name][ext]",
                },
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "./assets/img/[name][ext]",
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "./assets/fonts/[name][ext]",
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 4000,
        hot: isDev,
        // open: true,
    },
}
