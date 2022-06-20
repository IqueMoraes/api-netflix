import Joi from 'joi'

const createUserSchema = Joi.object({
  email: Joi.string().required().max(100),
  password: Joi.string().required().max(100)
})

const loginSchema = Joi.object({
  email: Joi.string().required().max(100),
  password: Joi.string().required().max(100)
})

export { createUserSchema, loginSchema }
