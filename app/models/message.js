const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * MessageSchema Schema
 */

const MessageSchema = new Schema({
    text: {type: String, default: ''},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

MessageSchema.statics = {
    getPublic: function (message) {
        return {
            id: message._id,
            text: message.text,
            user: message.user
        }
    }
};

module.exports = mongoose.model('Message', MessageSchema);