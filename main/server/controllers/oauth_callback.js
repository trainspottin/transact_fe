'use strict';

module.exports.index = function(req, res, next){
    res.render('oauth_callback', {});
};
