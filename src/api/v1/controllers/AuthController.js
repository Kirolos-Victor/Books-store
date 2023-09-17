require('dotenv').config()
const asyncHandler = require('express-async-handler')
const { validateUserRegister, validateUserLogin } = require('../validations/Auth')
const { User } = require('../models/User')
const bcrypt = require('bcryptjs')
const { handleError, handleResponse } = require('../helpers/JsonResponse')

/**
 * @desc Register a user and generate JWT token
 * @route /api/register
 * @method POST
 * @access public
 */
const register = asyncHandler(async (req, res) => {
  const { error, value } = validateUserRegister(req.body)
  if (error) return handleError(res, 422, error.details)

  let user = await User.findOne({ email: req.body.email })
  if (user) return handleError(res, 422, 'User already exists')

  value.password = bcrypt.hashSync(value.password, 10)
  user = new User(value)

  let result = await user.save()
  const token = user.generateToken(result)
  return handleResponse(res, 201, { user: user, token: token })
})

/**
 * @desc Login with user credentials and generate JWT token
 * @route /api/login
 * @method POST
 * @access public
 */
const login = asyncHandler(async (req, res) => {
  const { error, value } = validateUserLogin(req.body)
  if (error) return handleError(res, 422, error.details)

  const user = await User.findOne({ email: value.email })
  if (!user) return handleError(res, 422, 'Wrong credentials')

  const isPasswordMatch = await bcrypt.compare(value.password, user.password)
  if (!isPasswordMatch) return handleError(res, 422, 'Wrong credentials')

  const token = user.generateToken(user)

  return handleResponse(res, 200, { user: user, token: token })

})

module.exports = {
  register, login
}