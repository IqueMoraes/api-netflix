import BadRequest from './bad_request.exception';

class ValidationException extends BadRequest {
  details?: any[]

  constructor(message: string, details?: any[]) {
    super(message)
    this.details = details
  }
}

export default ValidationException
