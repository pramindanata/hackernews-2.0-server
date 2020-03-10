import { RequestHandler, Request, Response, NextFunction } from 'express'

export function wrapAsync(fn: RequestHandler<any>) {
  return (req: Request, res: Response, next: NextFunction): any => {
    fn(req, res, next).catch((err: any) => next(err))
  }
}
