import { NextFunction, Request } from 'express'
import { HttpStatus } from '../enums'
import HttpException from '../exceptions/http_abstract.exception'
import { CustomResponse } from '../interfaces/custom_response.interface'

export const errorHandlerMiddleware = (req: Request, res: CustomResponse, next: NextFunction) => {
    res.errorHandler = (e: any) => {
        console.log(e)
        if (e instanceof HttpException) {
            return res.status(e.status).json({ error: true, message: e.message, details: e })
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: true, detail: e })
        }
    }
    return next()
}

export default errorHandlerMiddleware
