import { NextFunction, Request, response } from 'express'
import { CustomResponse } from '../interfaces/custom_response.interface'

export const errorHandlerMiddleware = (req: Request, res: CustomResponse, next: NextFunction) => {
    console.log(req)
    res.errorHandler = (e: any) => {
    response.send({ error: true, message: e.message })
    }
    return next()
}

export default errorHandlerMiddleware
