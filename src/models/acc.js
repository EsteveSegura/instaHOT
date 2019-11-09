const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accSchema = new Schema({
     acc: String,
     lastIdPicture: {type: String, default: "0"},
     lastUrlPicture: {type: String, default: "http://null.com"},
     actualFeed :[{id: {type: String, defaul: "0"}, url:{type: String, default: "http://null.com"}}],
     similars : [{type: String, default: "_"}]
});

module.exports = mongoose.model('acc', accSchema)
