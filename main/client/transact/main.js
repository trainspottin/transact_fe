define(['require', 'angular',], function(localRequire, angular) {
    'use strict';
    const app = angular.module('app');
    const CtrlName = 'transactController';

    console.log('register:'+CtrlName);
    app.controller(CtrlName, function($scope){
        console.log('transact/main.js');
    });
    return CtrlName;
});
