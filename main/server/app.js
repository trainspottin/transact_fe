'use strict';
var NODE_DEBUG = process.env.NODE_DEBUG === "debug";
var NODE_ENV = process.env.NODE_ENV !== "production";
var NODE_HASH = (NODE_DEBUG) ? "dev" : ""+new Date().getTime();
global.conf = {
    env: { debug:NODE_DEBUG, production:NODE_ENV, hash:NODE_HASH}
};
console.log('global');
console.log(global.conf.env);

// Tools libraries
var path = require('path');
var gutil = require('gulp-util');

// Server libraries
var express = require('express');
var app = express();
var port = process.argv[2] || 3000;

// View Engine
gutil.log('views path: %s', path.join(__dirname, 'views'));
var mustacheExpress = require('mustache-express');
app.engine('mustache.html', mustacheExpress());
app.set('view engine', 'mustache.html');
app.set('views', path.join(__dirname, 'views'));

// Router configuration
var controllers_path = path.join(__dirname, 'controllers');
gutil.log('controllers path: %s', controllers_path);
var router = express.Router();
var application = require(path.join(controllers_path, 'application'));
var debug_controller = require(path.join(controllers_path, 'debug_controller'));
router.get('/', debug_controller.index, application.index);

// Apply router
var webDir = path.join(__dirname, '../client');
app.use(/\/assets\/[0-9a-z]+/, debug_controller.index, express.static(webDir));
app.use('/', router);
var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;
    gutil.log('Server is listening at http://%s:%s', host, port);
});
