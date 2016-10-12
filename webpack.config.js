const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        // 第三方包
        vendor: [
            'react',
            'react-dom',
            'antd'
        ]
    },
    output: {
        path: './dist',
        filename: 'index.js',
        publicPath: '/dist'
    },
    module: {
        noParse: [/moment.js/],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            },
            plugins: [["import", {
                "libraryName": "antd",
                "style": "css"   // or 'css'
            }]]
        },{
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    devServer: {
        inline: true,
        port: 8018
    }
};