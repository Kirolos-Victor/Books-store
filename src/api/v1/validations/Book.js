const Joi = require('joi')

function validateCreateBook (body) {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(30)
      .required(),
    price: Joi.number().min(0).required(),
    author: Joi.string().required(),

  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

function validateUpdateBook (body) {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(30),
    price: Joi.number().min(0),
    author: Joi.string()
  })
  const result = schema.validate(body, { abortEarly: false })
  return { error: result.error, value: result.value }
}

module.exports = {
  validateCreateBook,
  validateUpdateBook
}