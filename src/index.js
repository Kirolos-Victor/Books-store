require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
require('./config/database')
const logger = require('./config/logger')
//Init app
const app = express()
// Serve static files (storage) of authors
app.use(express.static('src/storage/authors'))
//Apply Middleware
app.use(helmet())
app.use(express.json())

//routes
app.use('/api/', require('./api/v1/routes/auth'))
app.use('/api/', require('./api/v1/routes/resetPassword'))
app.use(require('./api/v1/middlewares/AuthenticateToken'))
app.use('/api/books', require('./api/v1/routes/books'))
app.use('/api/authors', require('./api/v1/routes/authors'))
app.use(require('./api/v1/middlewares/Admin'))
app.use('/api/users', require('./api/v1/routes/user'))
app.use(require('./api/v1/middlewares/PageNotFound'))
app.use(require('./api/v1/middlewares/ObjectNotFound'))

//running server
try {
  const PORT = process.env.APP_PORT || 8000
  app.listen(PORT, () => {
    logger.info(`Server is running in ${process.env.APP_ENV} on port ${PORT}`)
  })
} catch (err) {
  logger.error(`Error with the server: ${err}`)
}
