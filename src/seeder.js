require('dotenv').config()
require('./config/database')
const { User } = require('./api/v1/models/User')
const bcrypt = require('bcryptjs')
const logger = require('./config/logger')

const createAdminUser = async () => {
  const user = new User({
    username: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456789', 10),
    isAdmin: true
  })
  await user.save()
  logger.info('Admin user created successfully')
}

if (process.argv[2] === '-import') {
  createAdminUser().then(() => {
    logger.info('All seeders are imported successfully')
    process.exit()

  }).catch((error) => {
    logger.info(`Failed import: ${error}`)
    process.exit()
  })
}