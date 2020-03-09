import { Request, Response } from 'express'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    return res.json({
      msg: 'hello',
    })
  }
}

export default Controller
