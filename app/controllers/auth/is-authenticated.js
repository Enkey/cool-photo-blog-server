var User = require('../../models/user');

module.exports = function (req, res) {
    if(req.isAuthenticated() && req.user) {
        User.findOne({email: req.user.email}, function (err, user) {
            user.getPublic(function (data) {
                res.json({isAuthenticated: true, user: data});
            });
        });
    } else {
        res.json({isAuthenticated: req.isAuthenticated()});
    }
};