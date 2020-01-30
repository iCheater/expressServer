const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan') // logger
const db = require('./models')
const bodyParser = require('body-parser')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const multer = require('multer')
const upload = multer()

const router = require('./routes')

const app = express()
app.use(morgan('dev'))

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app,
})
app.set('view engine', 'njk')

app.use(express.static(path.join(__dirname, 'public')))
// for parsing application/json
app.use(bodyParser.json())
// // for parsing application/xwww-form-urlencoded (parse incoming parameters requests to req.body)
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing multipart/form-data
app.use(upload.array())
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser())

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  store: new SequelizeStore({
    db: db.sequelize,
  }),
  saveUninitialized: false,
  cookie: {
    // expires: 24h * 60min * 60sec * 1000ms // 24 hours
    expires: 24 * 60 * 60 * 1000, // 10мин hours
  },
}))

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})

app.use('/', router)

module.exports = app
