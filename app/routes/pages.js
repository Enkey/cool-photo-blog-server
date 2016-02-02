var express = require('express');
var router = express.Router();
var config = require('../../config');

router.get('/', function (req, res) {
    res.sendFile('index.html', {root: config.publicPath});
});

module.exports = router;
