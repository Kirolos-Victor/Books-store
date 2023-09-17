const { createLogger, transports, level, error } = require('winston')

const logger = createLogger({
  transports: [
    new transports.File({ filename: 'app.log', level: 'error' }),
    new transports.Console({ level: 'info' })
  ]
})

module.exports = logger