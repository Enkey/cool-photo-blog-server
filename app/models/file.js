const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 * File Schema
 */

const FileSchema = new Schema({
    originalName: {type: String, default: ''},
    filename: {type: String, default: ''},
    size: {type: String, default: ''}
});

//FileSchema.methods = {
//    getPublic: function () {
//        return
//    }
//};

module.exports = mongoose.model('File', FileSchema);