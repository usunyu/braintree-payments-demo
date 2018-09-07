const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/template.html',
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('beta')
        }),
    ],
    output: {
        path: __dirname + '/public/beta/',
        publicPath: '/',
        filename: 'bundle.[chunkhash:8].js',
        hash: true,
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
    }
};
