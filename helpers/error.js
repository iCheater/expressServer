class ErrorHandler extends Error {
  constructor (statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}
// https://dev.to/nedsoft/central-error-handling-in-express-3aej
// const handleError = (err, res) => {
//   const { statusCode, message } = err
//   res.status(statusCode).json({
//     status: 'error',
//     statusCode,
//     message,
//   })
// }

const logErrors = (err, req, res, next) => {
  err.status = 'error'
  console.error(err)
  next(err)
}

const clientErrorHandler = (err, req, res, next) => {
  const { statusCode, message } = err
  if (req.xhr) {
    res.status(statusCode).send({
      status: 'error',
      statusCode,
      message,
    })
  } else {
    next(err)
  }
}
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err

  if (res.headersSent) {
    return next(err)
  }
  res.status(statusCode)
  // res.render('error', { error: err })
  // res.status(statusCode).send(err)
  res.render('500', { statusCode, message })
}

module.exports = {
  ErrorHandler,
  logErrors,
  clientErrorHandler,
  errorHandler,
}
