import express from 'express'

const server = () => {
  try {
    const app = express()
    app.use(express.json())

    app.listen(5000, () => {
      console.log('Server is running')
    })
  } catch (error) {
    console.log(error)
  }
}

server()
