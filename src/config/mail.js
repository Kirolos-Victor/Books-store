const nodemailer = require('nodemailer')
const logger = require('./logger')

const transporter = nodemailer.createTransport(
  {
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  }
)
transporter.verify(function (error, success) {
  if (error) {
    logger.error(`mailable error: ${error}`)
  } else {
    logger.info('Server is ready to take our messages')
  }
})

module.exports = transporter