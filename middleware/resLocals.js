const cartCookiesValidation = require('./../helpers/cartCookiesValidation')

const resLocals = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    // console.log('resLocals')
    res.locals.user = {
      name: req.session.user.username,
      id: req.session.user.id,
    }
  }

  if (req.cookies.user_sid) {
    res.locals.cart = cartCookiesValidation(req.cookies.cart)
  }
  next()
}

module.exports = resLocals
