const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * File Schema
 */

const FileSchema = new Schema({
    folder: {type: String, default: '/files'},
    originalName: {type: String, default: ''},
    filename: {type: String, default: ''},
    size: {type: String, default: ''}
});

FileSchema.statics = {
    getPublic: function (file) {
        return {
            path: file.folder + '/' + file.filename
        }
    }
};

module.exports = mongoose.model('File', FileSchema);