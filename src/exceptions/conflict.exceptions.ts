import HttpException from './http_abstract.exception';

class Conflict extends HttpException {
  message: string

  status: number

  constructor(message: string) {
    super(message, 409)
  }
}

export default Conflict
