var express = require('express');
const db = require("../db/urls")

function CreateRouters() {
    var router = express.Router()
    router.get('/:code', get_url_to_router);


    return router
}

function get_url_to_router(req, res, next) {
    console.log('get_url_to_router');
    db.get_by_code(req.params.code)
        .then((url) => {
            console.log('redirect to: ' + url.orig);
            return res.redirect(url.orig);
        })
        .catch((err) => {
            return res.status(404).json({ Status: "Not Found" })
        })
}


module.exports = CreateRouters