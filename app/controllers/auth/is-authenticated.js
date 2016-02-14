var User = require('../../models/user');

module.exports = function (req, res) {
    if(req.isAuthenticated() && req.user) {
        User.findOne({username: req.user.username}, function (err, user) {
            res.json({isAuthenticated: true, user: user.getPublic()});
        });
    } else {
        res.json({isAuthenticated: req.isAuthenticated()});
    }
};