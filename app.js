const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // logger
const sassMiddleware = require('node-sass-middleware');
const db = require('./models');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const fs = require('fs');

const router = require('./routes');

const app = express();
app.use(morgan('dev'));

const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');
///////////////////////////////////////////
// app.set('views', path.join(__dirname, './views/'));

// console.log(path.join(__dirname, './views'));
//
// fs.readdirSync(path.join(__dirname, './views/'), (err, items) => {
//     console.log(i, items);
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     }
//
//     for (let i=0; i < items.length; i++) {
//         console.log(items[i]);
//     }
// });

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


app.use('/', router);



// app.listen(3000, function () {
//     console.log('DATEBASE SYNCED');
//     db.sequelize.sync({
//         // force: true, // This creates the table, dropping it first if it already existed
//         alter: true // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
//     });
// });

// function sync() {
//     console.log('DATEBASE SYNCED');
//     db.sequelize.sync({
//         // force: true, // This creates the table, dropping it first if it already existed
//         // alter: true // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
//     });
// }
// sync();
module.exports = app;
