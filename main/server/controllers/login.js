'use strict';
var noCache = function(res){
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
};
module.exports.index = function(req, res, next){
    // No cache for Dynamic Web Application
    noCache(res);
    // 'X-FRAME-OPTIONS' indicate that wheather <frame>,<iframe>,<object> is loadable or not.
    res.set('X-FRAME-OPTIONS', 'DENY');

    var data_content = {
        base_url:'/assets/'+global.conf.env.hash+'/',
        play_auth_account_url: global.conf.app.play_authenticate_locator + '/login'
    };
    res.render('login', data_content);
};

