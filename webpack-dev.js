const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');
const proxy = require('proxy-middleware');
const url = require('url');
const gutil = require('gulp-util');//For Logger

var NODE_HASH = global.conf.env.hash;
var PORT = 3334;
module.exports = function(app){
    app.use('/assets', proxy(url.parse('http://localhost:'+PORT+'/assets')));
    var server = new WebpackDevServer(webpack(config), {
        contentBase: global.conf.dir.target_workspace,
        hot: true,
        quite: false,
        noInfo: false,
        publicPath: '/assets/'+NODE_HASH+'/',
        stats: {colors: true}
    }).listen(PORT, 'localhost', function(){
        gutil.log('webpack-dev-server is listening at :%s', PORT);
    });
}
