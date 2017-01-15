'use strict';

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

    var home_data = {
        body : {
            title: "Home Platform"
        },
        menu : {
            "Home" : "/#/home",
            "Admin" : {"User": "/#/amdin/user",
                       "Group" : "/#/admin/group",
                       "Resource" : "/#/admin/resource"
                      },
            "Bank" : {
                "Bank List" : "/#/bank",
                "Account" : "/#/account"
            },
            "Transaction" : { "Report" : "/#/transact/report",
                              "Search" : "/#/transact/search",
                              "Items" : "/#/transact/items"
                            },
            "Invest" : { "Gold" : "/#/invest/gold",
                         "Stock" : "/#/invest/stock",
                         "Currency" : "/#/invest/currency"
                       }
          },

        }
    };
    res.render('application', home_data);
    //res.send("application.js");
    //next();
};
