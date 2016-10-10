const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        // 第三方包
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: './dist',
        filename: 'index.js',
        publicPath: '/dist'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        },{
            test: /\.css$/,
            loader: 'style!css'
        },]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        inline: true,
        port: 8018
    }
};