import HttpException from './http_abstract.exception';

class Unauthorized extends HttpException {
  message: string

  status: number

  constructor(message: string) {
    super(message, 401)

    this.status = 401
    this.message = message
  }
}

export default Unauthorized
