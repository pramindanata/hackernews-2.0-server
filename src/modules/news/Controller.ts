import { Request, Response } from 'express'

class Controller {
  index(req: Request, res: Response): Response {
    return res.json({
      msg: 'hello',
    })
  }
}

export default Controller
