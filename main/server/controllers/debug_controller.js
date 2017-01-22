'use strict';

module.exports.index = function(req, res, next){
    console.log('connect in: '+ req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
};

