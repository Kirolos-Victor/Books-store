const Joi = require('joi')

function validateCreateUser (body) {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().required().min(3).max(30).email().trim(),
    isAdmin: Joi.boolean(),
    password: Joi.string().required().min(5).max(30),

    password_confirmation: Joi.string().equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

function validateUpdateUser (body) {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(30),
    email: Joi.string().required().min(3).max(30).email().trim(),
    isAdmin: Joi.boolean(),
    password: Joi.string().min(5).max(30),
    password_confirmation: Joi.string().equal(Joi.ref('password'))
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
      .when('password', {
        is: Joi.exist(),
        then: Joi.required()
      }),
  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

module.exports = {
  validateCreateUser,
  validateUpdateUser
}