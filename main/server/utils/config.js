const hjson = require('hjson');
const fs = require('fs');

module.exports.load = function(file){
    return hjson.parse(fs.readFileSync(file, {encoding: 'utf8'}));
}
