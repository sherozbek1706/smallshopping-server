import jwt from 'jsonwebtoken'
import { config } from '../utils/config/index.js'

export const verify = (req, res, next) => {
  try {
    const token = req.headers['authorization']
    if (!token) {
      return res
        .status(401)
        .json({ status: 401, error: 'Token is not given', data: null })
    }

    const verifyToken = jwt.verify(token, config.secret_key)

    req.user = verifyToken.user
    next()
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, error: 'This token is invalid ', data: null })
  }
}
