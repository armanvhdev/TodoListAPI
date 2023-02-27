import User from '../model/user.js'
import { StatusCodes } from 'http-status-codes'
import { CustomError } from '../errors/CustomError.js'

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body })
  const { username, email } = user
  const toekn = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    msg: 'Created',
    data: {
      username,
      email,
      toekn,
    },
  })
}
const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw CustomError.badRequest('please provide email and password')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw CustomError.unAuthenticated('Invalid')
  }

  const isCorrect = await user.comparePassword(password)
  if (!isCorrect) {
    throw CustomError.unAuthenticated('Invalid')
  }

  const toekn = user.createJWT()
  res.status(StatusCodes.OK).json({
    data: {
      email,
      toekn,
    },
  })
}

export default { registerUser, loginUser }
