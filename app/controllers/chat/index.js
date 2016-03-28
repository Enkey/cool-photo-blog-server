var User = require('../../models/user');
var Message = require('../../models/message');
module.exports = function (socket) {

    var session = socket.handshake.session;
    console.log(session);

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
        console.log('claim',user);
        if(!user) return;
        var exist = false;
        console.log(users);
        for(var i = 0; i < users.length; i++) {
            console.log('i',i);

            if(!users[i]) continue;

            if (users[i].username == user.username) {
                exist = true;
                break;
            }

        }
        if(!exist) {
            users.push(user);
        }

        console.log('claim users', users);
    };

    var get = function () {
        return users;
    };

    var free = function (user) {
        var index = -1;
        console.log('free', user);
        for(var i = 0; i < users.length; i++) {
            if (users[i].username === user.username) {
                index = i;
                break;
            }
        }
        if(index >= 0) {
            users = users.slice(index, 1);
        }
    };

    return {
        claim: claim,
        free: free,
        get: get
    };
}());
function connect(socket, user) {

    users.claim(user);
    var init = function() {
        return {
            currentUser: user,
            users: users.get()
        }
    };
    socket.emit('init', init());


    socket.on('init', function () {
        console.log('on init!');
        socket.emit('init', init());
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
            message.getPublic(function (message) {
                socket.broadcast.emit('send:message', message);
            });

        });

    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', user);
        users.free(user);
    });
}

