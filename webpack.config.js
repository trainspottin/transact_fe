const path = require('path');
const gutil = require('gulp-util');//For Logger
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//Load global.conf
if(!global.conf){
    var NODE_DEBUG = process.env.NODE_DEBUG === "debug";
    var NODE_ENV = process.env.NODE_ENV === "production";
    var NODE_HASH = (NODE_DEBUG) ? "dev" : ""+new Date().getTime();
    gutil.log('NODE_DEBUG=%s', NODE_DEBUG);
    gutil.log('NODE_ENV=%s', NODE_ENV);
    gutil.log('NODE_HASH=%s', NODE_HASH);
    
    var ROOT_DIR = __dirname;
    gutil.log('ROOT_DIR =%s', ROOT_DIR );
    global.conf = {
        env: { debug:NODE_DEBUG, production:NODE_ENV, hash:NODE_HASH},
        dir: {
            root: ROOT_DIR,
            client_context: path.resolve(ROOT_DIR, 'main/client/'),
            server_context: path.resolve(ROOT_DIR, 'main/server/'),
            target_workspace : path.join(ROOT_DIR, 'target/workspace/'),
            client_workspace : path.join(ROOT_DIR, 'target/workspace/assets/', NODE_HASH, 'client/'),
            server_workspace : path.join(ROOT_DIR, 'target/workspace/assets/', NODE_HASH, 'server/'),
        }
    };
    gutil.log('global.conf:');
    console.log(global.conf);
}

var NODE_HASH = global.conf.env.hash;
gutil.log('NODE_HASH =%s', NODE_HASH);

const CLIENT_CONTEXT = global.conf.dir.client_context;
const SERVER_CONTEXT = global.conf.dir.server_context;
const TARGET_WORKSPACE = global.conf.dir.target_workspace;
const CLIENT_WORKSPACE = global.conf.dir.client_workspace;
const SERVER_WORKSPACE = global.conf.dir.server_workspace;
gutil.log('CLIENT_CONTEXT:%s', CLIENT_CONTEXT);
gutil.log('SERVER_CONTEXT:%s', SERVER_CONTEXT);
gutil.log('TARGET_WORKSPACE path:%s', TARGET_WORKSPACE);
gutil.log('CLIENT_WORKSPACE path:%s', CLIENT_WORKSPACE);
gutil.log('SERVER_WORKSPACE path:%s', SERVER_WORKSPACE);

var nodeModules = {};
var fs = require('fs');
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
     })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;    
    });


module.exports = 
{
    devtool: 'source-map',
    name : 'client',
    context: CLIENT_CONTEXT,
    entry : {app:[
        'webpack-dev-server/client?http://127.0.0.1:3334',
        'webpack/hot/only-dev-server',
        './app.js'
    ], vendors:['jquery','bootstrap']},
    output: {
        path: CLIENT_WORKSPACE,
        filename : '[name].bundle.js',
        publicPath: '/assets/'+NODE_HASH+'/'
    },
    resolve: {
        extension: ['', '.js','.jsx']
    },
    module:{
        loaders: [
            {test:/\.js$/, exclude:/node_modules/, loader: 'babel-loader'},
            {test:/\.html$/, loader: 'raw', exclude: /node_modules/},
            {test:/\.css$/, loader: ExtractTextPlugin.extract( 'style-loader', 'css-loader')},
            {test:/\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            {test:/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        new ExtractTextPlugin('[name].bundle.css')
    ]
}
;
