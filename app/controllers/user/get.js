var User = require('../../models/user');

module.exports = function (req, res) {
    console.log(req.params.username);
    User.findOne({username: req.params.username}, function (err, user) {
        if(err) throw err;

        user.getPublic(function (data) {
            res.json({success: true, user: data});
        });

    });

};