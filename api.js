/**
 * Created by Hrvoje on 28.11.2017..
 */
//api.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var shortening = require('./shortening');
var config = require('./config');
var Url = require('./model/urlmodel');

var app = express();
var router = express.Router();

//"api" port will be 30001
var port = process.env.API_PORT || 3001;


var mongoDB = 'mongodb://'+config.db.user+':'+config.db.password+'@'+config.db.host+'/'+config.db.name;

mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

     res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});


router.route('/shorten').get(function(req, res) {

    }).post(function(req, res) {

        var url = new Url();

        url.url = req.body.url;
        url.shortUrl = '';


    Url.findOne({url:url.url},function(err, result) {

            if (result){

                url.shortUrl = config.webhost + shortening.encode(result._id);

                res.json({shortURL:url.shortUrl})

             }else{
                 console.log('result ne');
                  url.save(function(err) {
                     if (err)
                        console.log(err);

                       url.shortUrl = config.webhost + shortening.encode(url._id)

                      res.json({shortURL:url.shortUrl})

                 });
            }

         });


    });

router.route('/getURL').post(function(req, res) {

     var shortUrlId = req.body.urlKey;

    var id = shortening.decode(shortUrlId );

    // check if url already exists in database
    Url.findOne({_id: id}, function (err, doc){
        if (doc) {

            // url exists, redirect the user to their destination
            res.json(doc.url);

        } else {

            // nothing found, go back to home
            res.json(config.webhost);
        }
    });

});

//Use our router configuration when we call /api
app.use('/api', router);




//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});