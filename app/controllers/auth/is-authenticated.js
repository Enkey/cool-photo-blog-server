var User = require('../../models/user');

module.exports = function (req, res) {
    if(req.isAuthenticated() && req.user) {
        User.findOne({username: req.user.username}, function (err, user) {
            user.getPublic(function (data) {
                res.json({isAuthenticated: true, user: data});
            });
        });
    } else {
        res.json({isAuthenticated: req.isAuthenticated()});
    }
};