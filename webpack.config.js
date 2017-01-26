const path = require('path');
const gutil = require('gulp-util');//For Logger
const webpack = require('webpack');

var NODE_HASH = global.conf.env.hash;
gutil.log("NODE_HASH =%s", NODE_HASH);

const CLIENT_CONTEXT = global.conf.dir.client_context;
const SERVER_CONTEXT = global.conf.dir.server_context;
const TARGET_WORKSPACE = global.conf.dir.target_workspace;
const CLIENT_WORKSPACE = global.conf.dir.client_workspace;
const SERVER_WORKSPACE = global.conf.dir.server_workspace;
gutil.log("CLIENT_CONTEXT:%s", CLIENT_CONTEXT);
gutil.log("SERVER_CONTEXT:%s", SERVER_CONTEXT);
gutil.log("TARGET_WORKSPACE path:%s", TARGET_WORKSPACE);
gutil.log("CLIENT_WORKSPACE path:%s", CLIENT_WORKSPACE);
gutil.log("SERVER_WORKSPACE path:%s", SERVER_WORKSPACE);

var nodeModules = {};
var fs = require("fs");
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
     })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;    
    });


module.exports = 
{
    devtool: "source-map",
    name : "client",
    context: CLIENT_CONTEXT,
    entry : [
        "webpack-dev-server/client?http://127.0.0.1:3334",
        "webpack/hot/only-dev-server",
        "./app.js"
    ],
    output: {
        path: CLIENT_WORKSPACE,
        filename : "[name].bundle.js",
        publicPath: "/assets/"+NODE_HASH+"/"
    },
    resolve: {
        extension: ["", ".js"]
    },
    module:{
        loaders: [
           {test:/\.js$/, exclude:/node_modules/, loaders: ['react-hot-loader','babel-loader']},
           {test: /\.html$/, loader: "raw", exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
;
