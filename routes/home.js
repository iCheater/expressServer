var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var params = {
    title: 'Express' ,
    auth: true,
  };

  console.log('session',req.session.user);

  if (req.session.user && req.cookies.user_sid) {
    console.log('session',req.session.user);
    params.user = {
      name: req.session.user.username,
      id: req.session.user.id,
    };
  }

  res.render('home', params);
});

module.exports = router;
