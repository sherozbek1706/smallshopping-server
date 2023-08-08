
import { Router } from 'express'
import { readFile, writeFile } from '../utils/lib/fs.js'
import bcrypt from 'bcryptjs/dist/bcrypt.js'

export const usersRouter = Router()

usersRouter.post('/signup', async (req, res) => {
  try {
    const { full_name, age, username, password } = req.body
    const data = readFile('users.json')
    const checkUser = data.find((u) => u.username == username)
    const hashedPasswd = await bcrypt.hash(password, 10)

    if (checkUser) {
      return res.status(400).json({
        status: 400,
        msg: 'This username is already existed',
      })
    }

    const newUser = {
      id: data.at(-1)?.id + 1 || 1,
      full_name,
      age,
      username,
      password: hashedPasswd,
      is_admin: false,
      currency: 0,
    }
    data.push(newUser)

    writeFile('users.json', data)

    res.status(201).json({
      status: 201,
      data: [newUser],
      msg: 'Successfuly signed up',
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    })
  }
})
