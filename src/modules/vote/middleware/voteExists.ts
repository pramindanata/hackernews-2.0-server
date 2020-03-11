import { Request, Response, NextFunction } from 'express'
import * as RI from '~/interface'

export default (exists: 'yes' | 'no') => async (
  req: Request<{ newsId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { params } = req
  const { user } = req.ctx
  const vote: RI.Vote | undefined = await req.ctx.repo.vote.findOne({
    where: { newsId: params.newsId, userId: user?.id },
  })

  if (exists === 'yes') {
    // For downvote
    if (!vote) {
      return res.boom.forbidden('You have not voted yet')
    }
  } else {
    // For upvote
    if (vote) {
      return res.boom.forbidden('Already voted')
    }
  }

  // Save it to req for later use
  req.ctx.additional['vote'] = vote

  next()
}
