var passport = require('passport');

module.exports = function (req, res, next) {

    if (req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }

    passport.authenticate('local',
        function (err, user, info) {
            //console.log('err:', err);
            //console.log('info:', info);
            //console.log('user:', user);
            if (err) {
                return next(err);
            } else {
                if (user) {
                    req.logIn(user, function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            //console.log(typeof user);
                            res.json({success: true, user: user.getPublic()});
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