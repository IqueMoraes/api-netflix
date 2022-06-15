import Joi from 'joi'

const createShowSchema = Joi.object({
  title: Joi.string().required().length(45),
  cover: Joi.string().optional().length(200),
  director: Joi.string().optional().length(45),
  actors: Joi.string().optional().length(45),
  description: Joi.string().required().length(45),
  Category: Joi.string().required().length(45)
})

export default createShowSchema
