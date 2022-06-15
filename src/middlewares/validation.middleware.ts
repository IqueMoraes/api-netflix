import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'

function validationShowMiddleware(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
       await schema.validateAsync(req.body)

      return next()
    } catch (e: any) {
      res.status(400).json({ error: true, message: e.message })
    }
  }
}

export default validationShowMiddleware
