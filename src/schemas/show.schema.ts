import Joi from 'joi'
import { ShowCategory } from '../enums'
import { enumToStr } from '../helpers'

const createShowSchema = Joi.object({
  title: Joi.string().required().length(45),
  cover: Joi.string().optional().length(200),
  director: Joi.string().required().length(100),
  actors: Joi.string().required().length(200),
  description: Joi.string().required(),
  Category: Joi.string().required().valid(...enumToStr(ShowCategory))
})

export default createShowSchema
