var winston = require('winston');
var mongoose = require('mongoose');
var url = mongoose.model('url');
var site_id = mongoose.model('site_id');
var referal_ids = mongoose.model('referal_ids');
var _ = require('lodash')

module.exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        url.find()
            .then((urls) => {
                resolve(urls);
            })
            .catch((err) => {
                reject(err)
            });
    });
}

module.exports.get_by_code = function (code) {
    return new Promise(function (resolve, reject) {
        url.findOne({ code: code })
            .then((url) => {
                if (!_.isNull(url)) {
                     resolve(url);
                }
               reject()
            })
            .catch((err) => {
                reject()
            });
    });
}

module.exports.insert = function (orig_url) {
    return new Promise(function (resolve, reject) {
        url.findOne({ orig: orig_url })
            .then((url) => {
                if (!_.isNull(url)) {
                    return resolve(url);
                }
                gen_new_site(orig_url, resolve, reject)
            })
            .catch((err) => {
                gen_new_site(orig_url, resolve, reject)
            });


    })
}

function gen_new_site(orig_url, resolve, reject) {
    get_id()
        .then((id) => {
            return add_new_site(orig_url, id, resolve, reject)
        },
        (err) => {
            get_new_id((new_id) => {
                return add_new_site(orig_url, new_id, resolve, reject)
            })
        })
        .catch((err) => {
            get_new_id((new_id) => {
                return add_new_site(orig_url, new_id, resolve, reject)
            })
        })

}
function add_new_site(orig, code, next, reject) {
    var url_schema = new url({ code, orig })
    url_schema
        .save()
        .then((rec) => {
            return next(rec)
        })
        .catch((err) => {
            return reject(err)
        });
}

function get_new_id(on_id_ready) {
    site_id.findOne()
        .then((id) => {
            let code = 0
            if (!_.isNull(id)) {
                code = id.code
            }
            id
                .update({ code: code + 1 })
                .then((rec) => {
                    return on_id_ready(code)
                })
                .catch((err) => {
                    return on_id_ready()
                });
        })
        .catch((err) => {
            return on_id_ready()
        })
}


function get_id() {
    return new Promise(function (resolve, reject) {
        referal_ids.findOne()
            .then((id) => {
                if (_.isNull(id)) {
                    return reject()
                }
                const code = id.code
                referal_ids.remove({ code: id.code }, (err) => {
                    if (err) {
                        console.error(err)
                    }
                    return resolve(code)
                })
            })
            .catch((err) => {
                console.error(err);
                reject(err)
            })


    })
}

