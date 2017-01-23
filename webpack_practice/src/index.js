'use strict';

import angular from 'angular';
import appModule from 'config';

console.log("debug", "index.js bootstrap start");
angular.bootstrap(document, [appModule.name]);
console.log("debug", "index.js bootstrap end");

