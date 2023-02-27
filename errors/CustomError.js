import { StatusCodes } from 'http-status-codes'

class CustomError {
  constructor(statusCode, message) {
    this.statusCode = statusCode
    this.message = message
  }

  static badRequest(msg) {
    this.message = msg
    this.statusCode = StatusCodes.BAD_REQUEST
    return this
  }
  static unAuthenticated(msg) {
    this.message = msg
    this.statusCode = StatusCodes.UNAUTHORIZED
    return this
  }
  static notFound(msg) {
    this.message = msg
    this.statusCode = StatusCodes.NOT_FOUND
    return this
  }
}

export { CustomError }
