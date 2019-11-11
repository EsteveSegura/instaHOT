const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let similarsSchema = new Schema({
     acc: String,
     actualFeed :[{id: {type: String, defaul: "0"}, url:{type: String, default: "http://null.com"}}],
     added: {type: Boolean, default: false}
});

module.exports = mongoose.model('similars', similarsSchema)
