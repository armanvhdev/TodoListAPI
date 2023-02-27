import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const emailValidator = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!email.match(regex)) {
    throw new Error('please provide an true email')
  }
}

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "username can't be empty"],
    trim: true,
    maxlength: [55, 'username characters most be lower than 55'],
  },
  email: {
    type: String,
    required: true,
    validate: function (email) {
      emailValidator(email)
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password can't be empty"],
    trim: true,
    minlength: [7, 'password characters most be greater than 7'],
    maxlength: [55, 'password characters most be lower than 55'],
  },
})

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  )
}

userSchema.methods.comparePassword  = async function (password) {
  const isMatch = bcrypt.compare(password, this.password)
  return isMatch
}

export default mongoose.model('User', userSchema)
