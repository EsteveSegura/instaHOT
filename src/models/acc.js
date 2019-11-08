const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accSchema = new Schema({
     acc: String,
     lastIdPicture: {type: String, default: "0"}
});

module.exports = mongoose.model('acc', accSchema)
