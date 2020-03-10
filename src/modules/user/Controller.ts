import { Response } from 'express'
import { Request } from 'express-serve-static-core'
// import * as RI from '~/interface'
// import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    return res.send('yes')
  }

  async show(req: Request, res: Response): Promise<Response> {
    return res.send('yes')
  }
}

export default Controller
