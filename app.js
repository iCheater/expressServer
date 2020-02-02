const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan') // logger
const bodyParser = require('body-parser')
const session = require('express-session')
const multer = require('multer')
const upload = multer()
const redis = require('redis')
const redisClient = redis.createClient()
const RedisStore = require('connect-redis')(session)
const router = require('./routes')
const nunjucks = require('nunjucks')
const format = require('date-format')
const winston = require('./config/winston')
app.use(morgan('dev'))
// app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms'))
// app.use(morgan((tokens, req, res) => {
//   // console.log(tokens)
//   return [
//     (`[${format('hh:mm:ss.SSS', new Date())}]`),
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//   ].join(' ')
// }))

// error handler with res.locals logic. need to implement it
router.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// app.use(morgan('combined', { stream: winston.stream }))

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
  // store: new SequelizeStore({
  //   db: db.sequelize,
  // }),
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 86400,
  }),
  saveUninitialized: false,
  cookie: {
    // expires: 24h * 60min * 60sec * 1000ms // 24 hours
    expires: 24 * 60 * 60 * 1000,
  },
}))

app.disable('x-powered-by')
app.use('/', router)
// todo refactor!
/**
 * Module dependencies.
 */

const debug = require('debug')('express-server:server')
var http = require('http')

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
console.log('server : 127.0.0.1:' + port)
server.on('error', onError)
server.on('listening', onListening)

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
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

module.exports = app
