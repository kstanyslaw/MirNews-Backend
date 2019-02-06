var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: Date, required: true},
    article: {type: String, required: true},
    categories: [{ type: String }],
})

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('News', schema);