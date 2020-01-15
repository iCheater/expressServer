var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var db = require('./models');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');


var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var catalogRouter = require('./routes/catalog');
var blogRouter = require('./routes/blog');
var goodsRouter = require('./routes/goods');
var signupRouter = require('./routes/signup');
var adminRouter = require('./routes/admin_page');



var app = express();
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

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
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});



app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/items/', itemsRouter);
app.use('/catalog/', catalogRouter);
app.use('/blog/', blogRouter);
app.use('/goods/', goodsRouter);
app.use('/signup/', signupRouter);
app.use('/admin_page/', adminRouter);

app.listen(3000, function () {
    console.log('DATEBASE SYNCED');
    db.sequelize.sync();
});

// module.exports = app;
