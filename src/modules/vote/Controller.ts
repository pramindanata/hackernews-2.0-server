import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import * as I from './interface'
import * as RI from '~/interface'

class Controller {
  async store(req: Request<I.StoreParams>, res: Response): Promise<Response> {
    return res.send('test')
  }

  async delete(req: Request<I.DeleteParams>, res: Response): Promise<Response> {
    return res.send('test')
  }
}

export default Controller
