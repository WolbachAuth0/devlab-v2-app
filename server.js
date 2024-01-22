
const path = require('path')
if (process.env.NODE_ENV !== 'production') {
  console.log(`starting server in ${process.env.NODE_ENV} environment flag ...`)
  require('dotenv').config({ path: path.join(__dirname, '.env.development') })
}

const express = require('express')
const serveStatic = require('serve-static')
const cors = require('cors')
const helmet = require('helmet')
const enforceHTTPS = require('./middleware/enforceHTTPS')
const { oidcMiddleware } = require('./middleware/auth')
const { routerLogger, errorLogger } = require('./models/logger')
const { renderError } = require('./controllers/errors')

const app = express()

// middleware ...
app.use(express.json())
app.use(routerLogger)

// enable ALL cor
app.use(cors({ origin: '*' }))
// app.use(helmet({
//   // crossOriginResourcePolicy: false,
//   crossOriginEmbedderPolicy: false,
//   contentSecurityPolicy: false
// }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(oidcMiddleware)
app.use('/', serveStatic(path.join(__dirname, './public')))

if(process.env.NODE_ENV === 'production') {
  // oidc will not work without https
  app.use(enforceHTTPS)
}
app.use((req, res, next) => {
  res.locals.user = req.oidc.user
  next()
})

// routes
app.use('/', require('./routes/views'))
app.use('/api/users', require('./routes/users.api'))

// error handlers - must be declared after all other routes.
app.use('/', require('./routes/errors'))
app.use(renderError)

// express-winston errorLogger AFTER the other routes have been defined.
app.use(errorLogger)

module.exports = app
