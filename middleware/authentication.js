import jwt from 'jsonwebtoken'
import { CustomError } from '../errors/CustomError.js'

const authenticateMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw CustomError.unAuthenticated('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload =await jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw CustomError.unAuthenticated('Authentication invalid')
  }
}
export { authenticateMiddleware }
