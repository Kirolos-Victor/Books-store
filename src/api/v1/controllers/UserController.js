const asyncHandler = require('express-async-handler')
const { User } = require('../models/User')
const { validateCreateUser, validateUpdateUser } = require('../validations/User')
const bcrypt = require('bcryptjs')
const { handleResponse, handleError } = require('../helpers/JsonResponse')

/**
 * @desc Get all users
 * @route /api/users
 * @method GET
 * @access public
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: { $ne: true } })
  return handleResponse(res, 200, users)
})

/**
 * @desc Get a user by id
 * @route /api/users/:id
 * @method GET
 * @access public
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return handleError(res, 422, 'User not found')

  return handleResponse(res, 200, user)
})

/**
 * @desc create a user
 * @route /api/users
 * @method POST
 * @access public
 */
const storeUsers = asyncHandler(async (req, res) => {
  const { error, value } = validateCreateUser(req.body)
  if (error) return handleError(res, 422, error.details)

  let user = await User.findOne({ email: req.body.email })
  if (user) return handleError(res, 422, 'Email already used')

  value.password = bcrypt.hashSync(value.password, 10)
  user = new User(value)
  const result = await user.save()
  return handleResponse(res, 201, result)
})

/**
 * @desc Update a user by id
 * @route /api/users/:id
 * @method PUT
 * @access public
 */
const updateUser = asyncHandler(async (req, res) => {
  const { error, value } = validateUpdateUser(req.body)
  if (error) return handleError(res, 422, error.details)

  let user = await User.findOne({ email: req.body.email })
  if (user) if (req.params.id !== user.id) return handleError(res, 422, 'Email already used')

  if (value.password) value.password = bcrypt.hashSync(value.password, 10)

  user = await User.findByIdAndUpdate(req.params.id, value, { new: true })
  if (!user) return handleError(res, 422, 'User not found')

  return handleResponse(res, 200, user)
})

/**
 * @desc delete a user by id
 * @route /api/users/:id
 * @method DELETE
 * @access public
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) return handleError(res, 422, 'User not found')

  return handleResponse(res, 200, user)
})

module.exports = {
  getAllUsers,
  getUserById,
  storeUsers,
  updateUser,
  deleteUser
}