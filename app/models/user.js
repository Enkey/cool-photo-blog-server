var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

// set up a mongoose model and pass it using module.exports
var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
//User.plugin(passportLocalMongoose, {
//    selectFields: "username"
//});

module.exports = mongoose.model('User', User);