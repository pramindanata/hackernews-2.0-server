import { Request, Response, NextFunction } from 'express'

export default () => (req: Request, res: Response, next: NextFunction): void | Response => {
  if (!req.ctx.user) {
    return res.boom.unauthenticate()
  }

  next()
}
