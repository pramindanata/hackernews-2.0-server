import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '~/config'
import * as RI from '~/interface'
import Joi from '~/lib/joi'

export const schema = {
  register: {
    body: Joi.object({
      username: Joi.string()
        .alphaDash()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    }),
  },
  login: {
    body: Joi.object({
      username: Joi.string()
        .alphaDash()
        .required(),
      password: Joi.string().required(),
    }),
  },
}

export const generatePassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err)

        resolve(hash)
      })
    })
  })
}

export const comparePassword = (password: string, hashed: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed, (err, result) => {
      if (err) return reject(err)

      resolve(result)
    })
  })
}

export const generateToken = (user: RI.User): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: user.id,
    }

    jwt.sign(payload, config.app.secretKey, (err, token) => {
      if (err) return reject(err)

      resolve(token)
    })
  })
}
