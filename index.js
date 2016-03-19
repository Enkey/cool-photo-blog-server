var express = require('express');
var app = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');
var User = require('./app/models/user');

var pageRoutes = require('./app/routes/pages');
var usersRoutes = require('./app/routes/users');
var authRoutes = require('./app/routes/auth');
var fileRoutes = require('./app/routes/file');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

/* ======== Configuration ======== */
var port = process.env.PORT || 3000;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done){
    User.findOne({ email: email},function(err,user){
        if(err) {
            return done(err)
        }
        if(user) {
            if(user.authenticate(password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } else {
            return done(null, false, { message: 'Incorrect username.' });
        }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err ? done(err) : done(null,user);
    });
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(require('express-session')({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


/* ======== MongoDB ======== */
mongoose.connect(config.database);

/* ======== Routes ======== */
app.use('/', pageRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/file', fileRoutes);

/* CORS routes */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

/* __ Not found route __ */
app.use(function (req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.json({
        error: true,
        message: err.message,
        status: err.status
    });
});

/*||||||||||||||||SOCKET|||||||||||||||||||||||*/
//Listen for connection
io.on('connection', function(socket) {
    //Globals
    var defaultRoom = 'general';
    var rooms = ["General", "angular", "socket.io", "express", "node", "mongo", "PHP", "laravel"];

    //Emit the rooms array
    socket.emit('setup', {
        rooms: rooms
    });

    //Listens for new user
    socket.on('new user', function(data) {
        data.room = defaultRoom;
        //New user joins the default room
        socket.join(defaultRoom);
        //Tell all those in the room that a new user joined
        io.in(defaultRoom).emit('user joined', data);
    });

    //Listens for switch room
    socket.on('switch room', function(data) {
        //Handles joining and leaving rooms
        //console.log(data);
        socket.leave(data.oldRoom);
        socket.join(data.newRoom);
        io.in(data.oldRoom).emit('user left', data);
        io.in(data.newRoom).emit('user joined', data);

    });

    //Listens for a new chat message
    socket.on('new message', function(data) {
        //Create message
        var newMsg = new Chat({
            username: data.username,
            content: data.message,
            room: data.room.toLowerCase(),
            created: new Date()
        });
        //Save it to database
        newMsg.save(function(err, msg){
            //Send message to those connected in the room
            io.in(msg.room).emit('message created', msg);
        });
    });
});
/*||||||||||||||||||||END SOCKETS||||||||||||||||||*/



/*======== Start ======== */
app.listen(port);
console.log('Server started at http://localhost:' + port);