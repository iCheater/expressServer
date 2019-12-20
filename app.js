var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var db = require('./models');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var catalogRouter = require('./routes/catalog');
var blogRouter = require('./routes/blog');
var goodsRouter = require('./routes/goods');
var registerRouter = require('./routes/registration');
var adminRouter = require('./routes/admin_page');

var app = express();
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public/stylesheets/'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/items/', itemsRouter);
app.use('/catalog/', catalogRouter);
app.use('/blog/', blogRouter);
app.use('/goods/', goodsRouter);
app.use('/register/', registerRouter);
app.use('/admin_page/', adminRouter);


app.listen(3000, function() {
  console.log('DATEBASE SYNCED');
  db.sequelize.sync();
});

// module.exports = app;
