var express = require('express');
var router = express.Router();
var sessionChecker = require('./../middleware/sessionChecker');
// var admin_page = require('./../models').Admin;

router.use(sessionChecker);

router.use(function (req, res, next) {
    console.log('admin router !! Time:', Date.now());
    next()
});

router.get('/', function(req, res, next) {
    res.render('admin');
});

module.exports = router;

