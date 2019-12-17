var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var params = {
    title: 'Express' ,
    auth: true,
  };
  res.render('home', { title: 'Express' });
});




module.exports = router;
