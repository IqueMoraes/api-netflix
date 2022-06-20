import HttpException from './http_abstract.exception';

class BadRequest extends HttpException {
  message: string

  status: number

  constructor(message: string) {
    super(message, 400)
  }
}

export default BadRequest
