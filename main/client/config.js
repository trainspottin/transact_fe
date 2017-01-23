define(['require', 'angular', 'angular-ui-router'], function(require, angular, uiRouter) {
    console.log('config.js: enter...!!!');
    const app = angular.module('app', [uiRouter]);
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', { url:'/', template: '<h1>Home Template</h1>'},)
        .state('transact', {url:'transact', template: require('./transact/main.js')});
    }]);
    
    //$locationProvider.html5Mode(true);
    console.log('config.js: leave...!!!');
    return app;
});
