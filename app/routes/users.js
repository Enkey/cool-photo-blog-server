var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

router.get('/', user.main);
router.get('/get/:username', user.get);

router.post('/save', user.save);

module.exports = router;