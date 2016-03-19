var express = require('express');
var postRouter = express.Router();
var post = require('../controllers/post');

postRouter.post('/add', post.add);

//postRouter.get('/list', file.get);
//
//postRouter.get('/:id', file.get);

module.exports = postRouter;