var passport = require('passport');
var User = require('../../models/user');

module.exports = function (req, res, next) {

    if (req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }

    passport.authenticate('local',
        function (err, user, info) {
            if (err) {
                return next(err);
            } else {
                if (user) {
                    req.logIn(user, function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            user.getPublic(function (data) {
                                res.json({success: true, user: data})
                            });
                        }
                    });
                } else {
                    var message = 'Authentication error!';
                    if(info && info.message) {
                        message = info.message;
                    }
                    res.json({error: true, message: message});
                }
            }
        }
    )(req, res, next);
};