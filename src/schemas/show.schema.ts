import Joi from 'joi'
import { ShowCategory } from '../enums'
import { enumToStr } from '../helpers'

const createShowSchema = Joi.object({
  title: Joi.string().required().max(45).uppercase(),
  cover: Joi.string().optional().max(200).default(''),
  director: Joi.string().required().max(100).uppercase(),
  actors: Joi.string().required().max(200).uppercase(),
  description: Joi.string().required(),
  category: Joi.string().required().valid(...enumToStr(ShowCategory))
})

export default createShowSchema
