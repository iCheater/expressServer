
const resLocals = (req, res, next) => {
  // if (req.session.user && req.cookies.user_sid) {
  if (req.session.user) {
    // console.log('resLocals')
    res.locals.user = {
      name: req.session.user.username,
      id: req.session.user.id,
    }
  }
  // todo can we access to coockies without app.use(cookieParser()) ?
  if (req.session.cart) {
    // todo its better to calc cart once
    res.locals.cartLength = Object.keys(req.session.cart).length
  }

  // if (req.cookies.user_sid) { // todo can we access to coockies without app.use(cookieParser()) ?
  //   res.locals.cart = cartCookiesValidation(req.cookies.cart)
  // }
  next()
}

module.exports = resLocals
