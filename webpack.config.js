const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    //webpack dev
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },


    //plugins
    plugins: [new HtmlWebpackPlugin({
        'template': './src/index.html'
    })],

    //babel
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}


