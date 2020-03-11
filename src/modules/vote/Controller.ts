import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import * as I from './interface'
import * as RI from '~/interface'

class Controller {
  async store(req: Request<I.StoreParams>, res: Response): Promise<Response> {
    const { params } = req
    const { user } = req.ctx
    const vote: RI.Vote = req.ctx.repo.vote.create({
      user: { id: user?.id },
      news: { id: +params.newsId },
    })

    await req.ctx.repo.vote.save(vote)

    return res.json({
      id: vote.id,
      createdAt: vote.createdAt,
    })
  }

  async delete(req: Request<I.DeleteParams>, res: Response): Promise<Response> {
    const { vote } = req.ctx.additional as { vote: RI.Vote }

    await req.ctx.repo.vote.delete(vote.id)

    return res.json({
      id: vote.id,
      createdAt: vote.createdAt,
    })
  }
}

export default Controller
