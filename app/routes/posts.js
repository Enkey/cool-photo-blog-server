var express = require('express');
var postRouter = express.Router();
var post = require('../controllers/posts');

postRouter.post('/add', post.add);
postRouter.get('/', post.main);
postRouter.get('/category/:category_id', post.category);

module.exports = postRouter;