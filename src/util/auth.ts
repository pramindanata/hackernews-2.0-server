import { getManager } from 'typeorm'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import User from '~/model/User'
import config from '~/config'
import * as I from '~/interface'

export const getUserFromReq = async (req: Request): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    if (!req.headers.authorization) {
      return resolve()
    }

    const token = req.headers.authorization.replace('Bearer ', '')

    jwt.verify(token, config.app.secretKey, async (err, decoded) => {
      if (err) return reject(err)

      const payload = decoded as I.JWTPayload

      if (!payload.sub) {
        return resolve()
      }

      const user: User | undefined = await getManager().findOne(User, payload.sub)

      if (!user) {
        return resolve()
      }

      resolve(user)
    })
  })
}
