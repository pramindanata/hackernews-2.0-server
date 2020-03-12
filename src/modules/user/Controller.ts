import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import * as RI from '~/interface'
import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    const { query } = req as { query: I.IndexQuery }
    const sortKey = query.sort === 'username' ? 'user.username' : 'user.createdAt'
    let userQryBuilder = req.ctx.repo.user.createQueryBuilder('user')

    if (query.search) {
      const like = `%${query.search}%`

      userQryBuilder = userQryBuilder.where('username ILIKE :username', { username: like })
    }

    const totalQueryBuilder = userQryBuilder
    const usersP: Promise<RI.User[]> = userQryBuilder
      .loadRelationCountAndMap('user.newsCount', 'user.news', 'news')
      .offset(query.offset)
      .limit(query.limit)
      .orderBy(sortKey, query.order)
      .getMany()

    const totalP: Promise<number> = totalQueryBuilder.getCount()
    const [users, total] = await Promise.all([usersP, totalP])

    return res.json({
      total,
      data: users.map(user => ({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        newsCount: user.newsCount,
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
