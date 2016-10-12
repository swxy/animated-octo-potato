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
            }],['antd', {
                style: 'css', // if true, use less
            }]]
        },{
            test: /\.css$/,
            loader: 'style!css'
        },{
            test: /\.less$/,
            loader: "style!css!less"
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