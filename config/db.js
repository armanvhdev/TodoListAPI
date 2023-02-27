import mongoose from 'mongoose'

/**
 * @param {string} uri mongodb uri
 * @returns {Promise}
 */

const connectDB = async (uri) => {
  mongoose.set('strictQuery', false)
 return mongoose.connect(uri)
}

export { connectDB }
