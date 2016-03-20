var express = require('express');
var fileRouter = express.Router();
var file = require('../controllers/file');

fileRouter.post('/upload', file.upload);

module.exports = fileRouter;