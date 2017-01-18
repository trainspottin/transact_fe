define(['require', 'angular', './config'], function(localRequire, angular, appModule) {
    angular.bootstrap(document, [appModule.name]);
});
