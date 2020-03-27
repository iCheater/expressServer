const express = require('express')
const app = express()
const debug = require('debug')('express-server:server')
const http = require('http')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const multer = require('multer')
const upload = multer()
const redis = require('redis')
const redisClient = redis.createClient()
const RedisStore = require('connect-redis')(expressSession)
const router = require('./routes')
const nunjucks = require('nunjucks')
// const winston = require('winston')
const logger = require('./helpers/winstonLogger')
const morgan = require('./helpers/morganHTTPLogger')
const passport = require('./middleware/passport/passport')

app.use(morgan({ stream: logger.stream }))

// error handler with res.locals logic. need to implement it
// router.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}
//
//   // add this line to include winston logging
//   winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
//
//   // render the error page
//   res.status(err.status || 500)
//   res.render('500', { message: err })
// })

const evn = nunjucks.configure('views', {
  autoescape: true,
  express: app,
})
evn.addFilter('toFixed', (num, digits) => {
  return parseFloat(num).toFixed(digits)
})
evn.addFilter('addPennies', (num) => {
  return (num / 100).toFixed(2)
})
app.set('view engine', 'njk')
app.use(express.static(path.join(__dirname, 'public')))
// for parsing application/json // todo  Don't use app.use for your entire application if you really only need that middleware for 2 routes (I'm looking at you, body-parser)
app.use(bodyParser.json())
// // for parsing application/xwww-form-urlencoded (parse incoming parameters requests to req.body)
app.use(bodyParser.urlencoded({ extended: true }))
// for parsing multipart/form-data
app.use(upload.array())
// initialize cookie-parser to allow us access the cookies stored in the browser.
// app.use(cookieParser())

const session = expressSession({
  key: 'user_sid',
  secret: 'somerandonstuffs123qwer!@#$*$#',
  resave: false,
  // store: new SequelizeStore({
  //   db: db.sequelize,
  // }),
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 86400,
  }),
  saveUninitialized: true,
  cookie: {
    // expires: 24h * 60min * 60sec * 1000ms // 24 hours
    expires: 24 * 60 * 60 * 1000,
  },
})

if (app.get('env') === 'production') {
  // app.set('trust proxy', 1) // trust first proxy
  session.cookie.secure = true // serve secure cookies
}
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

app.disable('x-powered-by')
app.use('/', router)
// todo refactor!

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
logger.info('app.js started server:  http://localhost:' + port)
logger.warn(`NODE_ENV was set to [${process.env.NODE_ENV || 'nothing'}]`)
logger.warn(`LOG_LEVEL was set to [${process.env.LOG_LEVEL || 'nothing'}]. Possible values: error | warn | info | http | verbose | debug | silly `)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': {
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    }
    case 'EADDRINUSE': {
      logger.error(bind + ' is already in use')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    }

    default:
      throw error
  }
}

module.exports = app
