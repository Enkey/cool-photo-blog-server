var User = require('../../models/user');
var Message = require('../../models/message');
module.exports = function (socket) {

    var session = socket.handshake.session;

    if (!session.passport) return;

    User.findById(session.passport.user, function (err, user) {
        if (err) throw err;
        user.getPublic(function (data) {
            connect(socket, data);
        });

    });
};


// Keep track of which names are used so that there are no duplicates
var users = (function () {
    var users = [];

    var claim = function (user) {
        if(!user) return;
        var exist = false;
        users.forEach(function (u) {
            if (u.username === user.username) {
                exist = true;
                return false;
            }
        });
        if(!exist) {
            users.push(user);
        }
    };

    var get = function () {
        return users;
    };

    var free = function (user) {
        var index = -1;
        users.forEach(function (u, i) {
            if (u.username === user.username) {
                index = i;
                return false;
            }
        });
        if(index >= 0) {
            delete users[index];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get
    };
}());
function connect(socket, user) {
    console.log(user);

    users.claim(user);

    console.log(users.get());

    //var name = user.username;
    // send the new user their name and a list of users
    socket.emit('init', {
        currentUser: user,
        users: users.get()
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', user);

    // broadcast a user's message to other users
    socket.on('send:message', function (data) {
        var message = new Message({
            text: data.message,
            user: user.id
        });
        message.save(function () {
            socket.broadcast.emit('send:message', {
                user: user,
                text: data.message
            });
        });

    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', user);
        users.free(user);
    });
}

