var express = require('express');
var router = express.Router();

/* GET loader page. */
router.get('/', function(req, res, next) {
    var params = {
        title: 'Express' ,
        auth: true,
    };
    res.render('loader', { title: 'Express' });
});

router.post('/', function (req, res) {
    res.send('POST request to the homepage');
    res.render('catalog', { title: 'Express' });
})


module.exports = router;