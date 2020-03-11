function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  // res.render('error', { error: err })
  res.render('500', {
    error: err,
    // message: err.stack,
  })
}
module.exports = errorHandler
