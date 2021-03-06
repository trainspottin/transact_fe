var NODE_DEBUG = process.env.NODE_DEBUG === "debug";
var NODE_ENV = process.env.NODE_ENV !== "production";
var NODE_HASH = (NODE_DEBUG) ? "dev" : ""+new Date().getTime();

const path = require('path');
const gutil = require('gulp-util');//For Logger
const webpack = require('webpack');

gutil.log("NODE_DEBUG=%s", NODE_DEBUG);
gutil.log("NODE_ENV  =%s", NODE_ENV);
gutil.log("NODE_HASH =%s", NODE_HASH);

gutil.log("SERVER WORKSPACE: %s", path.join(__dirname, "target/workspace/assets/", NODE_HASH, "server/"));
const CONTEXT_PATH = path.resolve(__dirname, "main/client/");
const TARGET_WORKSPACE = path.join(__dirname, "target/workspace/");
const CLIENT_WORKSPACE = path.join(TARGET_WORKSPACE,"assets/", NODE_HASH,"client/");
const SERVER_WORKSPACE = path.join(TARGET_WORKSPACE,"assets/", NODE_HASH,"server/");

var nodeModules = {};
var fs = require("fs");
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
     })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;    
    });

/* Setup Plugin*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
var plugins = [];
//plugins.push(new HtmlWebpackPlugin({filename:"application.html", "template": path.resolve(__dirname,"main/server/views","application.mustache.html")}));
//plugins.push(new ExtractTextPlugin('app.bundle.css'));
plugins.push(new webpack.optimize.CommonsChunkPlugin(path.resolve(__dirname,'vendors'), 'vendors.js'));
plugins.push(new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery', 'root.JQuery': 'jquery'}));
//plugins.push(new CleanWebpackPlugin(['target'], {"root": __dirname, "verbose": true, "dry": false, "exclude": []    }));
plugins.push(new webpack.optimize.DedupePlugin());
plugins.push(new webpack.optimize.OccurenceOrderPlugin());
plugins.push(new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}));

gutil.log("CONTEXT path:%s", CONTEXT_PATH);
gutil.log("TARGET_WORKSPACE path:%s", TARGET_WORKSPACE);
gutil.log("CLIENT_WORKSPACE path:%s", CLIENT_WORKSPACE);
gutil.log("SERVER_WORKSPACE path:%s", SERVER_WORKSPACE);
module.exports = /*[
{
    name : "server",
    context: path.resolve(__dirname, "main/server"),
    entry : "./app.js",
    //target : "node",
    output: {
        path: path.join(TARGET_WORKSPACE, 'server/'),
        filename : "[name].bundle.js",
        publicPath: "/"
    },
    externals: nodeModules,
    module:{
        loaders: [{
            test: /\.mustache\.html$/,
            exclude: /node_modules/,
            loader: 'mustache'
         // loader: 'mustache?minify' 
         // loader: 'mustache?{ minify: { removeComments: false } }' 
         // loader: 'mustache?noShortcut' 
        },
        {test: /\.html$/, loader: "raw", exclude: /node_modules/}
        ]
    },
    plugins: plugins, 
},*/
{
    devtool: "source-map",
    name : "client",
    context: CONTEXT_PATH,
    entry : [
        "webpack-dev-server/client?http://127.0.0.1:8080",
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
           {test:/\.js$/, exclude:/node_modules/, loader:'babel-loader'},
           {test: /\.html$/, loader: "raw", exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devServer: {
        contentBase: SERVER_WORKSPACE,
        hot: true,
        proxy: {
            "*":"http://localhost:3000"
        }
    }
}
;
