var webpack = require('webpack');

module.exports = {
    mode:'development',
    devtool: 'source-map',
    entry: {
        'index': './src/index.ts'
    },
    output: {
        filename: '../public/bundle/[name].min.js',
        libraryTarget: 'var',
        library: '[name]'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['ts-loader']
        }]
    }
};
