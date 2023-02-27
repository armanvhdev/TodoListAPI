import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import limitRate from 'express-rate-limit'
import xss from 'xss-clean'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { notFound } from './middleware/notFound.js'
import { errorHandlerMiddleware } from './middleware/errorHandler.js'

import { authenticateMiddleware as auth } from './middleware/authentication.js'

import taskRouter from './routes/task.js'
import userRouter from './routes/user.js'

const app = express()

app.use(
  limitRate({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
)
app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss())

if (process.env.NODE_ENV == 'Developer') {
  app.use(morgan('dev'))
}

const APISetup = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TodoList API Documentation',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000/api/v1' }],
  },
  apis: ['./doc/API-Doc.yaml'],
})

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(APISetup))
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/tasks', auth, taskRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)

export default app
