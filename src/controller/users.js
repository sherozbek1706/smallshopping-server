import jwt from 'jsonwebtoken'
import { readFile, writeFile } from '../utils/lib/fs.js'
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import { config } from '../utils/config/index.js'
import { v4 } from 'uuid'

export const usersPost = async (req, res) => {
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
      id: v4(),
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
}

export const usersLogin = async (req, res) => {
  try {
    const { username, password } = req.body
    const data = readFile('users.json')

    const checkUser = data.find((u) => {
      return u.username == username
    })

    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        data: null,
        msg: 'User not found',
      })
    }
    const isValidPasswd = await bcrypt.compare(password, checkUser.password)

    if (!isValidPasswd) {
      return res.status(400).json({
        status: 400,
        data: null,
        msg: 'username or password incorrect',
      })
    }

    const token = jwt.sign({ user: { id: checkUser.id } }, config.secret_key)

    res.status(200).json({
      status: 200,
      data: {
        token,
      },
      msg: 'Successfully logged ',
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: error.message,
    })
  }
}

export const usersAll = (req, res) => {
  try {
    const data = readFile('users.jso')

    if (!data) {
      return res.status(400).json({
        status: 400,
        data: null,
        msg: 'Users not found',
      })
    }

    res.status(200).json({
      status: 200,
      data: data,
      msg: 'These are all users',
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: error.msg,
    })
  }
}
export const usersGetOne = (req, res) => {
  try {
    const { id } = req.params
    const data = readFile('users.json')

    if (!data) {
      return res.status(400).json({
        status: 400,
        data: null,
        msg: 'Users data not found',
      })
    }

    const user = data.find((u) => u.id == id)

    if (!user) {
      return res.status(200).json({
        status: 200,
        data: null,
        msg: 'This user is not found',
      })
    }

    res.status(200).json({
      status: 200,
      data: user,
      msg: 'ok',
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: error.message,
    })
  }
}
