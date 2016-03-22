var User = require('../../models/user');

module.exports = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) return res.json({error: true, message: "Missing params!"});

    if (req.isAuthenticated()) {
        return res.json({error: true, message: "Access denied!"})
    }

    User.findOne({username: username}, function (err, user) {
        //console.log(err);
        //console.log(user);
        if (!user) {
            var userDB = new User({username: username, password: password});
            userDB.save(function (err) {
                //console.log("user DB err", err);
                if (err) {
                    return next(err);
                } else {
                    req.login(userDB, function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            userDB.getPublic(function (data) {
                                res.json({success: true, user: data})
                            });
                        }
                    });
                }
            });
        } else {
            res.json({error: true, message: "User already exists!"});
        }
    });
};