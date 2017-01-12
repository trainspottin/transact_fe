
var noCache = function(res) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
};
module.exports.index = function(req, res, next) {
    // No cache for Dynamic Web Application
    noCache(res);
    // 'X-FRAME-OPTIONS' indicate that wheather <frame>,<iframe>,<object> is loadable or not.
    res.set('X-FRAME-OPTIONS', 'DENY');

    res.render('index', {head: {title:'title'}, body:{title: 'body title', description: 'description...'}});
    //res.send("application.js");
    //next();
};
