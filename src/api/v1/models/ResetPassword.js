const mongoose = require('mongoose')

const ResetPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  token: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  createdAt: {
    type: Date,
    required: true,
    maxLength: 255,
  }
})

const ResetPassword = mongoose.model('ResetPassword', ResetPasswordSchema)

module.exports = {
  ResetPassword
}