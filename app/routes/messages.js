var express = require('express');
var router = express.Router();
var messages = require('../controllers/messages');

router.get('/', messages.list);

module.exports = router;