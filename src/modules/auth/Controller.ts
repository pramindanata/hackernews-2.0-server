import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import jdenticon from 'jdenticon'
import fs from 'fs'
import * as RI from '~/interface'
import config from '~/config'
import * as I from './interface'
import { generatePassword, generateToken } from './util'

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

  async login(req: Request, res: Response): Promise<Response> {
    return res.send('yes')
  }
}

export default Controller
