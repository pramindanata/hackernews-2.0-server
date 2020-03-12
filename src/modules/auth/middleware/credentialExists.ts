import { Response, NextFunction } from 'express'
import { Request } from 'express-serve-static-core'
import { Not } from 'typeorm'
import User from '~/model/User'
import * as I from '../interface'
import * as RI from '~/interface'

export default (register: boolean) => async (
  req: Request<any, any, I.RegisterBody>,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  let fail = false
  const { body } = req
  const messages = {} as RI.JoiErrorMessages
  const userByUsernameP: Promise<User | undefined> = req.ctx.repo.user.findOne({
    where: {
      id: register ? undefined : Not(req.ctx.user?.id),
      username: body.username,
    },
  })
  const userByEmailP: Promise<User | undefined> = req.ctx.repo.user.findOne({
    where: {
      id: register ? undefined : Not(req.ctx.user?.id),
      email: body.email,
    },
  })
  const [userByUsername, userByEmail] = await Promise.all([userByUsernameP, userByEmailP])

  if (userByUsername) {
    fail = true
    messages.username = ['Username is already taken']
  }

  if (userByEmail) {
    fail = true
    messages.email = ['Email is already taken']
  }

  if (fail) {
    return res.boom.badData({
      body: messages,
    })
  }

  next()
}
