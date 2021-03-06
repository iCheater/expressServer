const resLocals = (req, res, next) => {
  // todo remove legacy
  if (req.session.user) {
    res.locals.user = {
      name: req.session.user.username,
      id: req.session.user.id,
    }
  }
  if (req.session.passport && req.session.passport.user) {
    res.locals.user = {
      name: req.session.passport.user.username,
      id: req.session.passport.user.id,
    }
  }

  if (req.session.cart) {
    res.locals.cartLength = req.session.cart.cartLength
  }

  // if (req.cookies.user_sid) { // todo can we access to coockies without app.use(cookieParser()) ?
  //   res.locals.cart = cartCookiesValidation(req.cookies.cart)
  // }

  next()
}

module.exports = resLocals
