const schemas = require("./schemas")
var mongoose = require('mongoose');

module.exports.init = function (connection_string) {
    mongoose.model('url', schemas.url);
    mongoose.model('referal_ids', schemas.referal_ids);
    mongoose.model('site_id', schemas.site_id);


    mongoose.Promise = global.Promise;
    mongoose.connect(connection_string);


}