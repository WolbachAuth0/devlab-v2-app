const responseFormatter = require('../middleware/responseFormatter')

module.exports = {
  notFoundError,
  renderError,
  classifyError,
  handleError
}

// Catch 404 and forward to error handler
function notFoundError (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
}

// render errors
function renderError (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500)
  res.render('error', {
    bootswatch: 'https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/flatly/bootstrap.min.css',
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  })
}

function classifyError (error) {
  const payload = {
    status: parseInt(error.statusCode) || 500,
    message: error.message || 'An error occurred.',
    data: error
  }
  return payload
}

function handleError (req, res, error) {
  console.log(error)
  const payload = classifyError(error)
  const json = responseFormatter(req, res, payload)
  res.status(payload.status).json(json)
}
