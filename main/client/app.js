define(['require', 'angular', './config'], function(require, angular, appModule) {
    console.log('app.js: enter...');
    var bootstrap = require('../../node_modules/bootstrap/dist/css/bootstrap.css');
    angular.bootstrap(document, [appModule.name]);
    console.log('app.js: leave...');
});
