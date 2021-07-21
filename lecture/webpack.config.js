const path = require('path');
const  webpack = require('webpack');

module.exports = {
    name: 'word-relay-setting',
    mode : 'development', // 실서비스 배포시 production
    devtool:'eval',
    resolve:{
        extensions:['.js', '.jsx'],
    },

    entry:{
        app: ['./client'],
    },//입력

    module:{
        rules:[{
            test:/\.jsx?$/,//정규표현식
            loader: 'babel-loader',
            exclude:/node_modules/,
            options:{
                presets:['@babel/preset-env', '@babel/preset-react'],
                plugins:['@babel/plugin-proposal-class-properties'],
            },
        }],
    },
    plugins:[new webpack.LoaderOptionsPlugin({debug:true})],
    output:{
        path:path.join(__dirname,'dist'),
        filename: 'app.js',
    },//출력
};