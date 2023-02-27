import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'somthing went wrong plaese try again later',
  }

  if (err.name == 'ValidationError') {
    error.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(' , ')

    error.statusCode = 400
  }
  if (err.code == 11000) {
    error.msg = `User already registered with email ${Object.values(
      err.keyValue,
    )}`
    error.statusCode = 400
  }
  if (err.name == 'CastError') {
    error.msg = `No task found with id : ${err.value}`
    error.statusCode = 404
  }
  res.status(error.statusCode).json({ msg: error.msg })
}

export { errorHandlerMiddleware }
