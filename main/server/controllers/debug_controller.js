'use strict';

module.exports.index = function(req, res, next){
    console.log('connect in');
    next();
};

