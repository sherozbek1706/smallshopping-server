import { Router } from 'express'
import { readFile, writeFile } from '../utils/lib/fs.js'
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import { usersAll, usersLogin, usersPost } from '../controller/users.js'
import { verify } from '../middleware/verify.js'

export const usersRouter = Router()

usersRouter.post('/signup', usersPost)
usersRouter.post('/signin', usersLogin)
usersRouter.get('/users/all', verify, usersAll)
