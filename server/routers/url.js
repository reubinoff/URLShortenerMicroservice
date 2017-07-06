var express = require('express');
const db = require("../db/urls")

function CreateRouters() {
    var router = express.Router()
    router.get('/', get_urls);
    router.post('/:url', add_url);


    return router
}

function add_url(req, res, next) {
    console.log('add_url');
    db.insert(req.params.url)
        .then((url) => {
            console.log('ok');
            const result = { original_url: url.orig, short_url: req.headers.host + "/" + url.code }
            res.json({ result })
            next()

        },
        (err) => {
            console.error(err)
            return res.status(500).json({ err })
        })
        .catch((err) => {
            return res.status(500).json({ err })
        })
}

function get_urls(req, res, next) {
    console.log('check_url');
    db.getAll()
        .then((urls) => {
            console.log('ok');
            return res.json({ urls })
        })
        .catch((err) => {
            return res.status(500).json({ err })
        })
}


module.exports = CreateRouters