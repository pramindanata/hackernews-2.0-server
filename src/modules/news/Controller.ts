import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import parseDomain from 'parse-domain'
import { FindConditions } from 'typeorm'
import { ILike } from '~/lib/typeorm'
import * as RI from '~/interface'
import * as I from './interface'

class Controller {
  async index(req: Request, res: Response): Promise<Response> {
    const { query }: { query: I.IndexQuery } = req
    const sortKey = 'createdAt'
    let where = {} as FindConditions<RI.News>[]

    if (query.search) {
      const like = `%${query.search}%`
      where = [{ title: ILike(like) }, { url: ILike(like) }, { domain: ILike(like) }]
    }

    const newsPromise: Promise<RI.News[]> = req.ctx.repo.news.find({
      where,
      order: {
        [sortKey]: query.order,
      },
      relations: ['user'],
      skip: query.skip,
      take: query.limit,
    })
    const totalPromise: Promise<number> = req.ctx.repo.news.count({ where })

    const [news, total] = await Promise.all([newsPromise, totalPromise])

    return res.json({
      total,
      data: news.map(news => ({
        id: news.id,
        title: news.title,
        domain: news.domain,
        url: news.url,
        user: { id: news.user.id, username: news.user.username },
        createdAt: news.createdAt,
      })),
    })
  }

  async show(req: Request<I.GetOneParams>, res: Response): Promise<Response> {
    const { params } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id, {
      relations: ['user'],
    })

    if (!news) {
      return res.boom.notFound()
    }

    return res.json({
      id: news.id,
      title: news.title,
      domain: news.domain,
      url: news.url,
      user: { id: news.user.id, username: news.user.username },
      createdAt: news.createdAt,
    })
  }

  async store(req: Request<any, any, I.StoreBody>, res: Response): Promise<Response> {
    const { body } = req
    const parsedDomain = parseDomain(body.url)
    const news = req.ctx.repo.news.create({
      title: body.title,
      url: body.url,
      domain: `${parsedDomain?.domain}.${parsedDomain?.tld}`,
      user: { id: req.ctx.user?.id },
    })

    await req.ctx.repo.news.save(news)

    return res.json({
      data: {
        id: news.id,
        title: news.title,
        domain: news.domain,
        url: news.url,
        createdAt: news.createdAt,
      },
    })
  }

  async update(req: Request<I.UpdateParams, any, I.UpdateBody>, res: Response): Promise<Response> {
    const { params, body } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    if (news.userId !== req.ctx.user?.id) {
      return res.boom.forbidden()
    }

    const parsedDomain = parseDomain(body.url)
    const updated = await req.ctx.repo.news.save({
      ...news,
      title: body.title,
      url: body.url,
      domain: `${parsedDomain?.domain}.${parsedDomain?.tld}`,
    })

    return res.json({
      data: {
        id: updated.id,
        title: updated.title,
        domain: updated.domain,
        url: updated.url,
        createdAt: updated.createdAt,
      },
    })
  }

  async delete(req: Request<I.DeleteParams>, res: Response): Promise<Response> {
    const { params } = req
    const news: RI.News | undefined = await req.ctx.repo.news.findOne(params.id)

    if (!news) {
      return res.boom.notFound()
    }

    if (news.userId !== req.ctx.user?.id) {
      return res.boom.forbidden()
    }

    await req.ctx.repo.news.delete(news.id)

    return res.json({
      id: news.id,
      title: news.title,
      domain: news.domain,
      url: news.url,
      createdAt: news.createdAt,
    })
  }
}

export default Controller
