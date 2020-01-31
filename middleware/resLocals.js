const resLocals = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    // console.log('resLocals')
    res.locals.user = {
      name: req.session.user.username,
      id: req.session.user.id,
    }
  }
  next()
}

module.exports = resLocals
