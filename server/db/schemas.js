var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var url = {
    code: { type: String, default: true },
    orig: { type: String, required: true }
    
}

var site_id ={
    code: { type: Number, required: true}
}

var referal_ids = {
    code: { type: Number, required: true}
}




module.exports.url = url
module.exports.site_id = site_id
module.exports.referal_ids = referal_ids
