define(['require', 'angular', 'angular-ui-router'], function(require, angular, uiRouter) {
    console.log('config.js: enter...!!!');
    const app = angular.module('app', [uiRouter]);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
          .state('home', { url:'/', template: '<h1>Home Template</h1>'},)
          .state('login', {url:'/login', templateUrl:'home/tpl/login.html', controller:'LoginController'},)
          .state('secure', {url:'/secure', templateUrl: 'home/tpl/secure.html', controller: 'SecureController'},)
          .state('transact', {url:'/transact', templateUrl: 'transact/tpl/main.html', controller: require('./transact/main.js')});
        $urlRouterProvider.otherwise('/');

    }]);
    
    //$locationProvider.html5Mode(true);
    console.log('config.js: leave...!!!');


    app.controller('LoginController', function($scope) {
        $scope.login = function(){
            window.location.href = 'https://api.imgur.com/oauth2/authorize?client_id='+'573f620f987a30f'+'&response_type=token';

        };
    });
    app.controller('SecureController', function($scope) {
        $scope.accountUsername = JSON.parse(window.localStorage.getItem('imgur')).oauth.account_username;

    });
    app.controller('BodyCtrl', ['$scope', '$rootScope', '$window', '$location', function($scope, $rootScope, $window, $location){
        $scope.go = function(redirectPath){
            console.log('go:'+redirectPath);
            $location.url(redirectPath, true);
        };
    }]);
    require('./transact/main.js');
    return app;
});


