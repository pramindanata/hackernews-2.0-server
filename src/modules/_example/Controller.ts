import { Response } from 'express'
import { Request } from 'express-serve-static-core'
// import { SelectQueryBuilder } from 'typeorm'
// import * as RI from '~/interface'
import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    return res.send('yay')
  }

  async show(req: Request<I.ShowParams>, res: Response): Promise<Response> {
    return res.send('yay')
  }

  async store(req: Request<any, any, I.StoreBody>, res: Response): Promise<Response> {
    return res.send('yay')
  }

  async update(req: Request<I.UpdateParams, any, I.UpdateBody>, res: Response): Promise<Response> {
    return res.send('yay')
  }

  async delete(req: Request<I.DeleteParams>, res: Response): Promise<Response> {
    return res.send('yay')
  }
}

export default Controller
