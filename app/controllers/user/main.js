var User = require('../../models/user');

module.exports = function (req, res) {
    User.find({}).populate('avatar').exec(function (err, users) {
        console.log(users);
        var parsedUsers = [];
        users.forEach(function(user){
            parsedUsers.push(User.public(user));
        });
        res.json({data: parsedUsers});
    });
};