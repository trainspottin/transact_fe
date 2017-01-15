'use strict';

// Tools libraries
var path = require('path');
var gutil = require('gulp-util');

// Server libraries
var express = require('express');
var app = express();
var port = process.argv[2] || 8080;

// View Engine
gutil.log("views path: %s", path.join(__dirname, 'views'));
var mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Router configuration
var controllers_path = path.join(__dirname, 'controllers');
gutil.log("controllers path: %s", controllers_path);
var router = express.Router(),
    application = require(path.join(controllers_path, 'application'));
router.get('/', application.index);

// Apply router
app.use('/', router);
var server = app.listen(port, function() {
     var host = server.address().address;
     var port = server.address().port;
     gutil.log('Server is listening at http://%s:%s', host, port);
});
