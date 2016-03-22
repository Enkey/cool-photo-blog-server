var express = require('express');
var postRouter = express.Router();
var post = require('../controllers/posts');

postRouter.post('/add', post.add);
postRouter.get('/', post.main);

module.exports = postRouter;