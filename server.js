import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })
import app from './app.js'
import { connectDB } from './config/db.js'

const port = process.env.PROT || 3000

const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URI)
    console.log('mongodb connected to port %s', db.connection.port)
    app.listen(port, () => {
      console.log('connected to port 3000')
    })
  } catch (err) {
    console.log(err)
  }
}

start()
