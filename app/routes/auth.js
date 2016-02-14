var express = require('express');
var authRouter = express.Router();
var auth = require('../controllers/auth');

authRouter.post('/signin', auth.signin);
authRouter.post('/signup', auth.signup);

authRouter.get('/logout', auth.logout);
authRouter.get('/is-authenticated', auth.isAuthenticated);

module.exports = authRouter;