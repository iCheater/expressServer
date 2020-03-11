function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({
      error: err,
      // message: err.stack,
    })
  } else {
    next(err)
  }
}
module.exports = clientErrorHandler
