var User = require('../../models/user');

module.exports = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) return res.json({error: true, message: "Missing params!"});

    if (req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }

    User.findOne({email: email}, function (err, user) {
        //console.log(err);
        //console.log(user);
        if (!user) {
            var userDB = new User({email: email, password: password});
            userDB.save(function (err) {
                //console.log("user DB err", err);
                if (err) {
                    return next(err);
                } else {
                    req.login(userDB, function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            res.json({success: true, user: userDB.getPublic()});
                        }
                    });
                }
            });
        } else {
            res.json({error: true, message: "User already exists!"});
        }
    });
};