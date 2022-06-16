import HttpException from './http_abstract.exception';

class NotFoundException extends HttpException {
  message: string

  status: number

  constructor(message: string) {
    super(message, 404)

    this.status = 404
    this.message = message
  }
}

export default NotFoundException
