define(['require', 'angular', 'angular-ui-router'], function(localRequire, angular, uiRouter) {
    const app = angular.module('app', [uiRouter]);
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', { url:'/', template: require('./home/main.js')},)
        .state('transact', {url:'transact', template: require('./transact/main.js')});
    }]);
    
    //$locationProvider.html5Mode(true);
});
