const mongoose = require('mongoose')
const logger = require('./logger')

//Connect to the database
mongoose.connect(process.env.MONGO_URI).then(() => {
  logger.info('Connected to mongoDB')
}).catch((error) => {
  logger.error('Connection to mongoDB failed! ', error)
})