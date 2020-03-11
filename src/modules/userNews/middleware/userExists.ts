import { Request, Response, NextFunction } from 'express'
import * as RI from '~/interface'
import * as I from '../interface'

export default () => async (
  req: Request<I.IndexParams>,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { params } = req
  const user: RI.User | undefined = await req.ctx.repo.user.findOne(params.userId)

  if (!user) {
    return res.boom.notFound()
  }

  next()
}
