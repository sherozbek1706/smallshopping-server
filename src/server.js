import express from 'express'
import { config } from './utils/config/index.js'

const server = () => {
  try {
    const app = express()
    app.use(express.json())

    app.listen(config.port, () => {
      console.log('Server is running')
    })
  } catch (error) {
    console.log(error)
  }
}

server()
