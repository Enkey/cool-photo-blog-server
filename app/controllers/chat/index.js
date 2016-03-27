var User = require('../../models/user');
module.exports  = function (socket) {
    console.log(socket.handshake.session);
    var session = socket.handshake.session;

    if(!session.passport) return;

    User.findById(session.passport.user, function (err, user) {
        if(err) throw err;
        user.getPublic(function (data) {
            connect(socket, data);
        });

    });
};


// Keep track of which names are used so that there are no duplicates
var users = (function () {
    var names = {};

    var claim = function (name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = true;
            return true;
        }
    };

    // serialize claimed names as an array
    var get = function () {
        var res = [];
        for (var user in names) {
            res.push(user);
        }

        return res;
    };

    var free = function (name) {
        //if (names[name]) {
        //    delete names[name];
        //}
        return;
    };

    return {
        claim: claim,
        free: free,
        get: get
    };
}());
function connect(socket, user) {
    console.log(user);
    //var name = user.username;
    // send the new user their name and a list of users
    socket.emit('init', {
        currentUser: user,
        users: users.get()
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
        user: user
    });

    // broadcast a user's message to other users
    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user: user,
            text: data.message
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', {
            user: user
        });
        users.free(user);
    });
}

