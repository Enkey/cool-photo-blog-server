var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require("express-session");
var sharedsession = require("express-socket.io-session");

var config = require('./config');
var User = require('./app/models/user');

var pageRoutes = require('./app/routes/pages');
var usersRoutes = require('./app/routes/users');
var authRoutes = require('./app/routes/auth');
var fileRoutes = require('./app/routes/file');
var postsRoutes = require('./app/routes/posts');
var categoriesRoutes = require('./app/routes/categories');
var messagesRoutes = require('./app/routes/messages');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

/* ======== Configuration ======== */
var port = process.env.PORT || 3000;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done){
    User.findOne({ username: username},function(err,user){
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
var appCookieParser = cookieParser();
app.use(appCookieParser);
var appSession = session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
});
app.use(appSession);
app.use(passport.initialize());
app.use(passport.session());



/* ======== MongoDB ======== */
mongoose.connect(config.database);

/* ======== Routes ======== */
app.use('/', pageRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/file', fileRoutes);
app.use('/posts', postsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/messages', messagesRoutes);

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

var chat = require('./app/controllers/chat');

io.use(sharedsession(appSession, appCookieParser, {
    autoSave: true
}));

io.on('connection', chat);


/*======== Start ======== */
server.listen(port);
console.log('Server started at http://localhost:' + port);