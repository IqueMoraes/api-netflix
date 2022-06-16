import { NextFunction, Request } from 'express'
import { Schema } from 'joi'
import ValidationException from '../exceptions/validation.exception'
import { CustomResponse } from '../interfaces/custom_response.interface'

function validationShowMiddleware(schema: Schema) {
  return async (req: Request, res: CustomResponse, next: NextFunction) => {
    try {
      const validated = await schema.validateAsync(req.body, { abortEarly: false, stripUnknown: true })

      if (validated.error) throw new ValidationException('Dados inválidos', validated.error?.details)

      return next()
    } catch (e: any) {
      res.errorHandler && res.errorHandler(e)
    }
  }
}

export default validationShowMiddleware
