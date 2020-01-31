const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  const params = {}

  // console.log('session', req.session.user)

  if (req.session.user && req.cookies.user_sid) {
    // console.log('session', req.session.user)
    params.user = {
      name: req.session.user.username,
      id: req.session.user.id,
    }
  }
  // console.log('req.session' , req.session)
  console.log(res.locals.user)

  res.render('home', {
    // user: {
    //   name: req.session.user.username,
    //   id: req.session.user.id,
    // },
  })
})

module.exports = router
