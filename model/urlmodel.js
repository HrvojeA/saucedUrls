/**
 * Created by Hrvoje on 28.11.2017..
 */

//model/urlmodel.js
'use strict';
//import dependency

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.



var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);



var UrlsSchema = new Schema({
    _id: {type:Number, index:true},
    url: String
});


UrlsSchema.pre('save', function(next){
    var doc = this;
    // find the url_count and increment it by 1

    var result = counter.collection.find({_id:'url_count'});

        if(result._id){

        }
        else{
            counter.collection.insert({_id:'url_count',seq:10000});

        }




     counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counterFound) {
        if (error)
            return next(error);
        // set the _id of the urls collection to the incremented value of the counter

        doc._id = counterFound.seq;
         doc.created_at = new Date();
        next();
    });
});
//export our module to use in api.js
module.exports = mongoose.model('Url', UrlsSchema);
