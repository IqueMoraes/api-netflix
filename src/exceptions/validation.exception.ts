import BadRequest from './bad_request.excepetion';

class ValidationException extends BadRequest {
  details?: string[]

  constructor(message: string, details: string[]) {
    super(message)

    this.details = details
  }
}

export default ValidationException
