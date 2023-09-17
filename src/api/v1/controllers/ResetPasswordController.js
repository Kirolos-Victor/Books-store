const asyncHandler = require('express-async-handler')
const { validateResetPassword, validateChangePassword } = require('../validations/ResetPassword')
const { User } = require('../models/User')
const { handleError, handleResponse } = require('../helpers/JsonResponse')
const sendEmail = require('../services/PasswordResetMail')
const { ResetPassword } = require('../models/ResetPassword')
const bcrypt = require('bcryptjs')
const generateToken = require('../helpers/GenerateRandomToken')
/**
 * @desc Send a link to the user email to reset the password
 * @route /api/forget-password
 * @method POST
 * @access public
 */
const sendResetLinkEmail = asyncHandler(async (req, res) => {
  const { error, value } = validateResetPassword(req.body)

  if (error) return handleError(res, 422, error.details)

  let user = await User.findOne({ email: value.email })
  if (!user) return handleError(res, 422, 'email does not exist')

  const email = await ResetPassword.findOne({ email: user.email })
  if (email) await email.deleteOne()

  const token = generateToken
  const resetLink = `http://localhost:5000/api/reset-password?token=${token}`
  await sendEmail(user.email, resetLink)
  const resetPassword = new ResetPassword({
    email: user.email,
    token: token,
    createdAt: Date.now()
  })
  await resetPassword.save()

  return handleResponse(res, 200, 'The password reset link is sent to your email')

})

/**
 * @desc Generate a new password
 * @route /api/reset-password
 * @method POST
 * @access public
 */
const changePassword = asyncHandler(async (req, res) => {
  const { error, value } = validateChangePassword(req.body)
  if (error) return handleError(res, 422, error.details)

  const resetPassword = await ResetPassword.findOne({ token: value.token })
  if (!resetPassword) return handleError(res, 422, 'The token has expired')

  const user = User.findOne({ email: resetPassword.email })
  if (!user) return handleError(res, 422, 'User not found')
  const password = bcrypt.hashSync(value.password, 10)
  await user.updateOne({
    password: password
  })
  await resetPassword.deleteOne()
  return handleResponse(res, 200, 'Password updated successfully')
})

module.exports = {
  sendResetLinkEmail,
  changePassword
}