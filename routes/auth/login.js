const express = require('express')
const router = express.Router()
const { User, Address } = require('../../models')
const appRoot = require('app-root-path')
const logger = require(`${appRoot}/helpers/winstonLogger`)

// /* GET loader page. */
router.get('/', (req, res, next) => {
  res.render('auth/login')
})

router.post('/', (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    logger.verbose({ private: true, message: `Req.body contains: username:[${username}] and password: [${password}]` })
    return res.redirect(400, '/login')
  }
  logger.verbose(`Login request with: [${username}] and password [${password}]`)

  User.findOne({
    where: { username: username },
    include: { model: Address, as: 'addresses' },
  })
    .then(async (user) => {
      if (!user) {
        logger.verbose(`Username [${username}] not found`)
        res.status(400)
        res.redirect('/login')
      } else if (!await user.validPassword(password)) {
        logger.verbose({ private: true, message: `[${password}] is invalid password for user [${username}]` })
        res.status(400)
        res.redirect('/login')
      } else {
        logger.verbose('Login and password are valid')
        console.log('login ok. user')
        req.session.user = user.dataValues
        // req.session.user = {'test':"test"};
        // console.log('user.dataValues',user.dataValues);
        res.status(200)
        res.redirect('/')
      }
    })
})

module.exports = router
