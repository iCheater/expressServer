const appRoot = require('app-root-path')
const logger = require(appRoot + '/config/winstonLogger')
const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  const params = {}

  if (req.session.user && req.cookies.user_sid) {
    // console.log('session', req.session.user)
    params.user = {
      name: req.session.user.username,
      id: req.session.user.id,
    }
  }
  // console.log('req.session' , req.session)
  // winston.log(res.locals.user)
  // winston.log('log', 'test')
  logger.info('req.cookies %O', req.cookies)
  logger.log('info', 'req.cookies %O', req.cookies)

  // console.log(req.cookies)
  res.render('home', {
    // user: {
    //   name: req.session.user.username,
    //   id: req.session.user.id,
    // },
  })
})

module.exports = router
