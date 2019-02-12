var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// Child schema for single language article body
var bodySchema = new Schema({
    language: {type: String, required: true},
    title: {type: String, required: true},
    article: {type: String, required: true},
}, {_id: false});

// Parent schema for news with array of news in 
var schema = new Schema({
    author: {type: String, required: true},
    date: {type: Date, required: true},
    body: [bodySchema],
    categories: [{ type: String }],
})

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('News', schema);