import express from 'express'
import { config } from './utils/config/index.js'
import { usersRouter } from './routers/users.routes.js'

const server = () => {
  try {
    const app = express()
    app.use(express.json())
    app.use(usersRouter)

    app.listen(config.port, () => {
      console.log('Server is running')
    })
  } catch (error) {
    console.log(error)
  }
}

server()
