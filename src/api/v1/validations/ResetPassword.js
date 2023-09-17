const Joi = require('joi')

function validateResetPassword (body) {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(30).email().trim(),

  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

function validateChangePassword (body) {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(30)
      .required(),
    password_confirmation: Joi.any().equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

module.exports = {
  validateResetPassword,
  validateChangePassword
}