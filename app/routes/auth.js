var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.post('/signin', function (req, res, next) {
    //passport.authenticate('local',
    //    function(err, user, info) {
    //       console.log('user:', user);
    //        return err
    //            ? next(err)
    //            : user
    //            ? req.logIn(user, function(err) {
    //            return err
    //                ? next(err)
    //                : res.redirect('/private');
    //        })
    //            : res.redirect('/fail');
    //    }
    //)(req, res, next);
    console.log(req);
    passport.authenticate('local',
        function(err, user, info) {
            console.log('err:', err);
            console.log('info:', info);
            console.log('user:', user);
            if(err) {
                return next(err);
            } else {
                if(user) {
                    req.logIn(user, function(err) {
                        if(err) {
                            return next(err);
                        } else {
                            res.json({success: true, user: user});
                        }
                    });
                } else {
                    res.json({error: true, message: 'Authentication error!'});
                }
            }
        }
    )(req, res, next);
});

router.post('/logout', function(req, res) {
    req.logout();
    res.json({success: true});
});

router.post('/signup', function (req, res, next) {
    var username = req.body.username;

    if(!username) return next({});

    if(req.isAuthenticated()) {
        return res.json({blocked: true})
    }

    User.findOne({ username: username}, function (err, user) {
        console.log(err);
        console.log(user);
        if(!user) {
            var user = new User({ username: req.body.username, password: req.body.password});
            user.save(function(err) {
                if(err) {
                    return next(err);
                } else {
                    req.login(user, function (err) {
                        if(err) {
                            return next(err);
                        } else {
                            res.json({success: true, user: user});
                        }
                    });
                }
            });
        } else {
            res.json({error: true, message: "User already exists!"});
        }
    });



    //User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    //    if (err) {
    //        return res.json({error: true, message: "Sorry. That username already exists. Try again."});
    //    }
    //
    //    passport.authenticate('local')(req, res, function () {
    //        req.session.save(function (err) {
    //            if (err) {
    //                return next(err);
    //            }
    //            res.json({success: true, user: user});
    //        });
    //    });
    //});
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({success: true});
    });
});

module.exports = router;