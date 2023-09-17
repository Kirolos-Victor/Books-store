const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      trim: true
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true,
    toJSON: {
      transform (doc, ret) {
        delete ret.password
      },
    },
  },
)
UserSchema.methods.generateToken = function (data) {
  return jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET_KEY)
}
const User = mongoose.model('User', UserSchema)

module.exports = { User }