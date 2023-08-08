import 'dotenv/config'

export const config = {
  port: process.env.PORT,
  secret_key: process.env.JWT_SECRET_KEY,
}
