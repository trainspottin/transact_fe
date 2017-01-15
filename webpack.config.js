var NODE_DEBUG = process.env.NODE_DEBUG === "debug";
var NODE_ENV = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var fs = require("fs");
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;    
    });


module.exports = [
{
    name : "client",
    context: __dirname+"/main",
    devtool: NODE_DEBUG  ? "inlin-sourcemap" : null,
    entry: './client/js/scripts.js',
    output:{
        path: __dirname + "/target/workspace/assets/[hash]",
        filename: "[name].min.js",
        publicPath: "/assets/[hash]/"
    },
    plugins: NODE_DEBUG ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ], 
},{
    name : "server",
    context: __dirname+"/main/server",
    entry : "./app.js",
    target : "node",
    output: {
        path: __dirname + "target/workspace/asset/[hash]/server",
        filename : "[name].bundle.js",
        publicPath: "/"
    },
    externals: nodeModules,
    plugins: NODE_DEBUG ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ], 
}
];
