var express = require('express')
var app = express()
var logger = require('winston')
var bodyParser = require('body-parser');

var morgan = require('morgan')
var mongoose = require('mongoose');
const db = require("./db")

const PORT = 3000
const pages_path = __dirname + "/www"
const connection_string = "mongodb://localhost:27017/url_shortener_microservice_srv"

logger.add(logger.transports.File, { filename: "/tmp/test.log" })

logger.log(express.static(pages_path))
logger.info('Using mongo connection: ', connection_string)

db.init(connection_string)


app.set('view engine', 'jade')
app.set('views', __dirname + '/www')


app.use(express.static(pages_path));


// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//routers

const { logger_router, url_router, redirect_router} = require("./routers")


app.use('/', logger_router())
app.use('/new', url_router())
app.use('/', redirect_router())


app.get('/', function(req, res){
  res.render('index', {
    title: 'Consolidate This'
  })
})


// app.use('/api', ControllerRouters(passport));


app.listen(PORT, function () {
    console.log('Example app listening on port ', PORT)
})






module.exports = app;
