const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var User = require('./user');

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

MessageSchema.methods = {
    getPublic: function (cb) {
        const Message = mongoose.model('Message');
        Message.findById(this._id).populate(Message.getPopulateQuery()).exec(function (err, message) {
            if (err) throw err;
            cb(Message.public(message));
        });
    }
};

MessageSchema.statics = {
    public: function (message) {
        return {
            id: message._id,
            text: message.text,
            user: User.public(message.user)
        }
    },
    getPopulateQuery: function () {
        return [
            {
                path: 'user',
                populate: {
                    path: 'avatar',
                    model: 'File'
                }
            }
        ];
    }
};

module.exports = mongoose.model('Message', MessageSchema);