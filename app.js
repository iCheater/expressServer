var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan'); // logger
var sassMiddleware = require('node-sass-middleware');
var db = require('./models');
var bodyParser = require('body-parser');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);


var indexRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var catalogRouter = require('./routes/catalog');
var blogRouter = require('./routes/blog');
var goodsRouter = require('./routes/goods');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');
var taskRouter = require('./routes/tasks');
var profileRouter = require('./routes/profile');
var categoriesRouter = require('./routes/categories');
var testRouter = require('./routes/test');

var app = express();
app.use(morgan('dev'));

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    store: new SequelizeStore({
        db: db.sequelize
    }),
    saveUninitialized: false,
    cookie: {
        // expires: 24h * 60min * 60sec * 1000ms // 24 hours
        expires: 24 * 60 * 60 * 1000 // 10мин hours
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

//public
app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/items/', itemsRouter);
app.use('/catalog/', catalogRouter);
app.use('/blog/', blogRouter);
// app.use('/goods/', goodsRouter);
// app.use('/profile/', profileRouter);

//auth
app.use('/signup/', signupRouter);
app.use('/login/', loginRouter);
//admin
app.use('/admin/', adminRouter);
app.use('/admin/goods/', goodsRouter);
app.use('/admin/tasks/', taskRouter);
app.use('/admin/categories/', categoriesRouter);
//
app.use('/test', testRouter);



// app.listen(3000, function () {
//     console.log('DATEBASE SYNCED');
//     db.sequelize.sync({
//         // force: true, // This creates the table, dropping it first if it already existed
//         alter: true // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
//     });
// });
function sync() {
    console.log('DATEBASE SYNCED');
    db.sequelize.sync({
        // force: true, // This creates the table, dropping it first if it already existed
        // alter: true // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
    });
}
sync();
module.exports = app;
