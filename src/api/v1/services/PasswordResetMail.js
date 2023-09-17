require('dotenv').config()
const transporter = require('../../../config/mail')
const logger = require('../../../config/logger')

async function main (email, resetLink) {
  const info = await transporter.sendMail({
    from: 'kirolos@admin.com',
    to: email,
    subject: 'Reset Password ✔',
    text: '\n' +
      'Hi,\n' +
      '\n' +
      'Forgot your password? Let’s get you a new one!',
    html: `<a href=${resetLink}>RESET MY PASSWORD</a>`, // html body
  })
  logger.info('Email sent')
}

module.exports = main