const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
    username: {type: String, default: ''},
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    hashed_password: {type: String, default: ''},
    salt: {type: String, default: ''}
});

const validatePresenceOf = function (value) {
    return value && value.length
};

/**
 * Virtuals
 */

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makesalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
/**
 * Validations
 */

//
//UserSchema.path('name').validate(function (name) {
//    if (this.skipValidation()) return true;
//    return name.length;
//}, 'Name cannot be blank');
//
//UserSchema.path('email').validate(function (email) {
//    if (this.skipValidation()) return true;
//    return email.length;
//}, 'Email cannot be blank');
//
UserSchema.path('username').validate(function (username, fn) {
    const User = mongoose.model('User');

    if (this.isNew) {
        User.find({username: username}).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    } else fn(true);
}, 'Username already exists');

//UserSchema.path('email').validate(function (email) {
//    return email.length;
//}, 'Email cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
    return hashed_password.length && this._password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {

    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    } else {
        next();
    }
});

/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

    makesalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    getPublic: function (cb) {
        const User = mongoose.model('User');
        User.findById(this._id).populate('avatar').exec(function (err, user) {
            if (err) throw err;
            cb(User.public(user))
        });
    }
};

/**
 * Statics
 */

UserSchema.statics = {

    /**
     * Load
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    load: function (options, cb) {
        options.select = options.select || 'username email';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    },

    public: function (user) {
        return {
            id: user._id,
            username: user.username,
            avatar: (user.avatar) ? user.avatar.folder + '/' + user.avatar.filename : null
        }
    }


};

module.exports = mongoose.model('User', UserSchema);