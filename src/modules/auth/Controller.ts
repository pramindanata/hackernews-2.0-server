import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import jdenticon from 'jdenticon'
import fs from 'fs'
import * as RI from '~/interface'
import config from '~/config'
import * as I from './interface'
import { comparePassword, generatePassword, generateToken } from './util'

class Controller {
  async register(req: Request<any, any, I.RegisterBody>, res: Response): Promise<Response> {
    const { body } = req
    const image: Buffer = jdenticon.toPng(body.username, 400)
    const imageName = `${body.username}-${new Date().getTime()}.png`
    const user: RI.User = req.ctx.repo.user.create({
      username: body.username,
      email: body.email,
      password: await generatePassword(body.password),
      photo: imageName,
    })
    const path = `${config.app.public}/images/${imageName}`

    await Promise.all([req.ctx.repo.user.save(user), fs.promises.writeFile(path, image)])

    return res.json({
      token: await generateToken(user),
    })
  }

  async login(req: Request<any, any, I.LoginBody>, res: Response): Promise<Response> {
    const { body } = req
    const user: RI.User | undefined = await req.ctx.repo.user.findOne(
      { username: body.username },
      {
        select: ['id', 'password'],
      },
    )

    if (!user) {
      return res.boom.forbidden('Invalid credentials given')
    }

    if (await comparePassword(body.password, user.password)) {
      return res.json({
        token: await generateToken(user),
      })
    }

    return res.boom.forbidden('Invalid credentials given')
  }

  async me(req: Request, res: Response): Promise<Response> {
    const newsCount: number = await req.ctx.repo.news.count({
      where: {
        userId: req.ctx.user?.id,
      },
    })

    return res.json({
      data: {
        ...req.ctx.user,
        newsCount,
      },
    })
  }
}

export default Controller
