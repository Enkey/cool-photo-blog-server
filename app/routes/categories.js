var express = require('express');
var router = express.Router();
var category = require('../controllers/categories');

router.post('/add', category.add);

router.get('/', category.main);

module.exports = router;