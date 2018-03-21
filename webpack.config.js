'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: './app/main_page',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {discardComments: {removeAll: true}},
                        },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true,
        }),
    ],
    devServer: {
        noInfo: !true,   // use `false` to show chunks rendering
        proxy: {
            '/': {target: 'http://backend:8000'}
        },
    },
};
