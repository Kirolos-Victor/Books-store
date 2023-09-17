const Joi = require('joi')

function validateCreateAuthor (body) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(30),
    lastName: Joi.string().required().min(3).max(30),
    nationality: Joi.string().required().min(3).max(30),
    image: Joi.any().required()
  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

function validateUpdateAuthor (body) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    nationality: Joi.string().required().min(3).max(30),
    image: Joi.string()

  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

module.exports = {
  validateUpdateAuthor,
  validateCreateAuthor
}