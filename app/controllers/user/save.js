var User = require('../../models/user');
var File = require('../../models/file');

module.exports = function (req, res) {
    if(!req.isAuthenticated()) {
        return res.json({error: true, message: 'Access denied!'});
    }

    if(req.body.avatar_id) {

        File.findOne({_id: req.body.avatar_id}, function (err, avatar) {
            if (err) throw err;

            User.findByIdAndUpdate(req.user._id, {avatar: avatar._id}, {}, function (err, user) {
                if (err) throw err;

                user.getPublic(function (data) {
                    res.json({success: true, user: data});
                });

            });

        });
    }
};