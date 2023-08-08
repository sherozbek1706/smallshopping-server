import express from 'express'
import { config } from './utils/config/index.js'
import { productsRouter } from './routers/products.routes.js'
import cors from 'cors'
import { usersRouter } from './routers/users.routes.js'

const server = () => {
  try {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use(productsRouter)
    app.use(usersRouter)

    app.listen(config.port, () => {
      console.log(`Server has been started on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server()
