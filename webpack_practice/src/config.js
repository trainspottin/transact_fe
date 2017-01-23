import angular from 'angular'
import uiRouter from 'angular-ui-router'

console.log("debug", "config.js start");
const app = angular.module('app', [uiRouter]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    console.log("debug", "configging");
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('todos', { url: '/', template: require('todos/todos.html') })
    .state('about', { url: 'about', template: require('about/about.html') });

    $locationProvider.html5Mode(true);
});


console.log("debug", "config.js end");
export default app;
