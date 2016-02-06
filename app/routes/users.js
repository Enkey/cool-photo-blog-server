var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});
router.get('/:username', function (req, res) {
    console.log(req.params.username);
    User.findOne({username: req.params.username}, function (err, user) {
        if(err) throw err;
        res.json({user: user.getPublic()});
    });

});
module.exports = router;