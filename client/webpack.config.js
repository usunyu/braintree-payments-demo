const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: 'source-map',
    entry: __dirname + '/src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/template.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        }),
    ],
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?minimize',
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        contentBase: './public',
        colors: true,
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true
    }
};
