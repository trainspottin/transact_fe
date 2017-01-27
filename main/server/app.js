'use strict';
const path = require('path');
const gutil = require('gulp-util');
const express = require('express');
const mustacheExpress = require('mustache-express');

//Load global.conf
if(!global.conf){
    var NODE_DEBUG = process.env.NODE_DEBUG === "debug";
    var NODE_ENV = process.env.NODE_ENV === "production";
    var NODE_HASH = (NODE_DEBUG) ? "dev" : ""+new Date().getTime();
    gutil.log('NODE_DEBUG=%s', NODE_DEBUG);
    gutil.log('NODE_ENV=%s', NODE_ENV);
    gutil.log('NODE_HASH=%s', NODE_HASH);
    
    var ROOT_DIR = path.resolve(__dirname, '../../');
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

// Server libraries
var app = express();
var port = process.argv[2] || 3333;



// View Engine
gutil.log('views path: %s', path.join(__dirname, 'views'));
app.engine('mustache.html', mustacheExpress());
app.set('view engine', 'mustache.html');
app.set('views', path.join(__dirname, 'views'));

// Router configuration
var controllers_path = path.join(__dirname, 'controllers');
gutil.log('controllers path: %s', controllers_path);
var router = express.Router();
var application = require(path.join(controllers_path, 'application'));
var login = require(path.join(controllers_path, 'login'));
var debug_controller = require(path.join(controllers_path, 'debug_controller'));
router.get('/', debug_controller.index, application.index);
router.get('/login', debug_controller.index, login.index);

// Apply router
var webDir = path.join(__dirname, '../client');
app.use(/\/assets\/[0-9a-z]+/, debug_controller.index, express.static(webDir));
app.use('/', router);

//Dev Mode
if(!global.conf.env.production){
    require('../../webpack-dev')(app);
}

var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;
    gutil.log('Server is listening at http://%s:%s', host, port);
});
