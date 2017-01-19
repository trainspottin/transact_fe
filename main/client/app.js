define(['angular', './config'], function(angular, appModule) {
    console.log('app.js: enter...');
    angular.bootstrap(document, [appModule.name]);
    console.log('app.js: leave...');
});
