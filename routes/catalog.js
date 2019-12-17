var express = require('express');
var router = express.Router();

/* GET catalog page. */
router.get('/', function(req, res, next) {
    var params = {
        title: 'Express' ,
        auth: true,
    };
    res.render('catalog', { title: 'Express' });
});




module.exports = router;