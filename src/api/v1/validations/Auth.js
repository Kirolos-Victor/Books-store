const Joi = require('joi')

function validateUserRegister (body) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(200).required(),
    email: Joi.string().max(200).required().email(),
    password: Joi.string().min(8).required().label('Password'),
    password_confirmation: Joi.any().equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
    isAdmin: Joi.boolean()
  })
  let result = schema.validate(body,{ abortEarly: false })
  return { error: result.error, value: result.value }
}

function validateUserLogin (body) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().required(),
  })
  let result = schema.validate(body,{ abortEarly: false })
  return { error: result.error, value: result.value }
}

module.exports = {
  validateUserRegister,
  validateUserLogin,
}