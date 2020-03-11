import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import { FindConditions, Brackets } from 'typeorm'
import * as RI from '~/interface'
import { ILike } from '~/lib/typeorm'
import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    const { query } = req as { query: I.IndexQuery }
    let where = {} as FindConditions<RI.User>
    const sortKey = query.sort === 'username' ? 'username' : 'createdAt'

    if (query.search) {
      const like = `%${query.search}%`

      where = { username: ILike(like) }
    }

    const usersP: Promise<RI.User[]> = req.ctx.repo.user.find({
      where,
      order: {
        [sortKey]: query.order,
      },
      skip: query.skip,
      take: query.limit,
    })
    const totalP: Promise<number> = req.ctx.repo.user.count({ where })
    const [users, total] = await Promise.all([usersP, totalP])

    return res.json({
      total,
      data: users.map(user => ({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        photo: user.photo,
      })),
    })
  }

  async show(req: Request<I.ShowParams>, res: Response): Promise<Response> {
    const { params } = req
    const user: RI.User | undefined = await req.ctx.repo.user
      .createQueryBuilder('user')
      .loadRelationCountAndMap('user.newsCount', 'user.news', 'news')
      .where('user.id = :id', { id: params.id })
      .getOne()

    if (!user) {
      return res.boom.notFound()
    }

    return res.json({
      data: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        photo: user.photo,
        newsCount: user.newsCount,
      },
    })
  }
}

export default Controller
