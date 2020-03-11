import { Request, Response, NextFunction } from 'express'
import * as RI from '~/interface'

export default () => async (
  req: Request<{ newsId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { params } = req
  const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.newsId)

  if (!news) {
    return res.boom.notFound()
  }

  next()
}
