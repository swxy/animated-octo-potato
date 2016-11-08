const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        index: './src/index.js',
        // 第三方包
        vendor: [
            'pouchdb-browser',
            'antd',
            'moment'
        ]
    },
    externals: {
        "antd": 'antd',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'moment': 'moment',
        'redux': 'Redux',
        'react-redux': 'ReactRedux'
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
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ExtractTextPlugin("[name].css")
    ],
    devServer: {
        inline: true,
        port: 8018
    }
};